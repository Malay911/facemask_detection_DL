# Face Mask Detection API

A production-ready FastAPI backend for face mask detection using a PyTorch CNN model.

## Project Structure

```
facemask_detection/
    app/
        __init__.py
        main.py            # FastAPI application & endpoints
        model_loader.py    # TorchScript model loading
        inference.py       # Prediction logic
        schemas.py         # Pydantic request/response models
        utils.py           # Image preprocessing utilities
    model/
        mask_detector_scripted.pt   # TorchScript model
    requirements.txt
    README.md
```

## Installation

```bash
# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt
```

> **Note:** For PyTorch, you may want to install the CPU-only version to save space:
> ```bash
> pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
> ```

## Running the Server

```bash
uvicorn app.main:app --reload
```

The API is live at: `https://malay911-facemask-detection.hf.space`

## API Documentation (Swagger UI)

Open your browser and go to:

```
https://malay911-facemask-detection.hf.space/docs
```

This provides an interactive interface to test all endpoints.

## API Endpoints

### 1. Health Check

```
GET /health
```

Response:
```json
{"status": "API running"}
```

### 2. Predict from Image Upload

```
POST /predict
```

- Upload an image file (JPEG, PNG, WebP, BMP)
- Returns prediction and confidence

Response:
```json
{"prediction": "With Mask", "confidence": 0.96}
```

### 3. Predict from Base64 Image

```
POST /predict/base64
```

- Send base64-encoded image in JSON body
- Returns prediction and confidence

Request body:
```json
{"image": "base64_encoded_string_here"}
```

## Testing with cURL

```bash
# Health check
curl https://malay911-facemask-detection.hf.space/health

# Predict from file
curl -X POST -F "file=@test_image.jpg" https://malay911-facemask-detection.hf.space/predict

# Predict from base64
curl -X POST -H "Content-Type: application/json" \
  -d '{"image": "base64_string_here"}' \
  https://malay911-facemask-detection.hf.space/predict/base64
```

## Tech Stack

- **FastAPI** — High-performance async web framework
- **PyTorch** — Deep learning inference (TorchScript)
- **Torchvision** — Image preprocessing transforms
- **Uvicorn** — ASGI server
- **Pillow** — Image handling
