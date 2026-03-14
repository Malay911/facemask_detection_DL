import os
import io
import base64
import torch
import torchvision
import numpy as np
import cv2
from typing import List, Dict
from contextlib import asynccontextmanager
from PIL import Image
from pydantic import BaseModel
from torchvision import transforms
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# ---------- Constants & Configuration ----------

# Path configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "mask_detector.pth")

# Class label mapping: 1=With Mask, 2=Without Mask, 3=Incorrect Mask (0 is background)
CLASS_LABELS = {
    1: "With Mask",
    2: "Without Mask",
    3: "Incorrect Mask"
}

# Allowed image MIME types
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp", "image/bmp"}

# Global model reference
model = None

# ---------- Pydantic Schemas ----------

class PredictionResponse(BaseModel):
    """Response schema for single mask detection prediction."""
    prediction: str
    confidence: float

class HealthResponse(BaseModel):
    """Response schema for health check endpoint."""
    status: str

class Base64Request(BaseModel):
    """Request schema for base64 image prediction."""
    image: str

class ErrorResponse(BaseModel):
    """Response schema for error messages."""
    detail: str

class FaceResult(BaseModel):
    """Single face detection result with mask classification."""
    label: str
    confidence: float
    bbox: List[int] # [x, y, width, height]

class DetectionResponse(BaseModel):
    """Response schema for multi-face detection endpoint."""
    faces_detected: int
    results: List[FaceResult]
    annotated_image: str

# ---------- Utility Functions ----------

def validate_content_type(content_type: str) -> bool:
    """Check if the uploaded file has a valid image MIME type."""
    return content_type in ALLOWED_TYPES

def preprocess_image(image: Image.Image):
    """Preprocess a PIL image for model inference."""
    image = image.convert("RGB")
    tensor = transforms.ToTensor()(image)
    return [tensor]

def decode_base64_image(base64_string: str) -> Image.Image:
    """Decode a base64-encoded image string to a PIL Image."""
    if "," in base64_string:
        base64_string = base64_string.split(",", 1)[1]
    try:
        image_bytes = base64.b64decode(base64_string)
        image = Image.open(io.BytesIO(image_bytes))
        return image
    except Exception as e:
        raise ValueError(f"Invalid base64 image: {str(e)}")

# ---------- Model Loader ----------

def load_model():
    """Load the Faster R-CNN model from disk."""
    global model
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found at: {MODEL_PATH}")
    try:
        model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=False, min_size=512, max_size=512)
        num_classes = 4
        in_features = model.roi_heads.box_predictor.cls_score.in_features
        model.roi_heads.box_predictor = torchvision.models.detection.faster_rcnn.FastRCNNPredictor(in_features, num_classes)
        model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device("cpu")))
        model.eval()
        print(f"Model loaded successfully from: {MODEL_PATH}")
        return model
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {str(e)}")

def get_model():
    """Get the loaded model instance."""
    if model is None:
        raise RuntimeError("Model has not been loaded. Call load_model() first.")
    return model

# ---------- Inference Logic ----------

def predict(image: Image.Image) -> dict:
    """Run mask detection inference on a PIL image (legacy single-face)."""
    m = get_model()
    input_tensors = preprocess_image(image)
    with torch.no_grad():
        preds = m(input_tensors)
    pred = preds[0]
    pred_labels = pred["labels"].cpu().numpy()
    pred_scores = pred["scores"].cpu().numpy()
    if len(pred_scores) == 0:
        return {"prediction": "No Face Detected", "confidence": 0.0}
    best_idx = pred_scores.argmax()
    best_score = float(pred_scores[best_idx])
    if best_score < 0.5:
        return {"prediction": "No Face Detected", "confidence": best_score}
    label = CLASS_LABELS.get(int(pred_labels[best_idx]), "Unknown")
    return {"prediction": label, "confidence": round(best_score, 4)}

def detect_and_classify(image_bytes: bytes) -> dict:
    """Multi-face detection with bounding boxes and annotation."""
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise ValueError("Could not decode image.")
    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    (img_h, img_w) = frame.shape[:2]
    m = get_model()
    input_tensors = preprocess_image(image)
    with torch.no_grad():
        preds = m(input_tensors)
    pred = preds[0]
    pred_boxes = pred["boxes"].cpu().numpy()
    pred_labels = pred["labels"].cpu().numpy()
    pred_scores = pred["scores"].cpu().numpy()
    results = []
    faces_detected = 0
    for bbox, label_idx, score in zip(pred_boxes, pred_labels, pred_scores):
        if score < 0.5:
            continue
        faces_detected += 1
        label = CLASS_LABELS.get(int(label_idx), "Unknown")
        confidence = float(score)
        x1, y1, x2, y2 = map(int, bbox)
        results.append({
            "label": label,
            "confidence": round(confidence, 4),
            "bbox": [x1, y1, x2 - x1, y2 - y1]
        })
        color = (0, 200, 80) if label == "With Mask" else (0, 0, 230) if label == "Without Mask" else (0, 165, 255)
        thickness = max(2, int(min(img_h, img_w) / 250))
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, thickness)
        font_scale = max(0.45, min(img_h, img_w) / 800)
        font_thickness = max(1, int(font_scale * 1.8))
        label_text = f"{label} ({int(confidence * 100)}%)"
        (text_w, text_h), baseline = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, font_thickness)
        pad = int(text_h * 0.35)
        label_y = max(y1 - pad, text_h + pad)
        cv2.rectangle(frame, (x1, label_y - text_h - pad), (x1 + text_w + pad * 2, label_y + pad), color, -1)
        cv2.putText(frame, label_text, (x1 + pad, label_y), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), font_thickness, cv2.LINE_AA)
    _, buffer = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
    annotated_b64 = base64.b64encode(buffer).decode("utf-8")
    return {
        "faces_detected": faces_detected,
        "results": results,
        "annotated_image": f"data:image/jpeg;base64,{annotated_b64}"
    }

# ---------- FastAPI Application ----------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load models on startup."""
    try:
        load_model()
        print("Face Mask Detection API is ready!")
    except RuntimeError as e:
        print(f"CRITICAL: {e}")
        raise
    yield
    print("Shutting down API...")

app = FastAPI(
    title="Face Mask Detection API",
    description="AI-powered face mask compliance monitoring with multi-face detection, analytics, and visualization.",
    version="2.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    return {"status": "API running"}

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_image(file: UploadFile = File(...)):
    if not validate_content_type(file.content_type):
        raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    try:
        image = Image.open(io.BytesIO(contents))
        return predict(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/predict/base64", response_model=PredictionResponse, tags=["Prediction"])
async def predict_base64(request: Base64Request):
    if not request.image or len(request.image.strip()) == 0:
        raise HTTPException(status_code=400, detail="Base64 image string is empty.")
    try:
        image = decode_base64_image(request.image)
        return predict(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/detect", response_model=DetectionResponse, tags=["Detection"])
async def detect_faces(file: UploadFile = File(...)):
    if not validate_content_type(file.content_type):
        raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    try:
        detection_result = detect_and_classify(contents)
        return detection_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

