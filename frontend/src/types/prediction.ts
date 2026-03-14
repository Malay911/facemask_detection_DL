// Types for the Face Mask Detection API

// ---------- Legacy single-face types ----------

export interface PredictionResponse {
    prediction: string; // "With Mask" | "Without Mask" | "Incorrect Mask" | "No Face Detected"
    confidence: number; // 0 to 1
}

export interface HealthResponse {
    status: string;
}

export type PredictionStatus = "idle" | "loading" | "success" | "error";

// ---------- Multi-face detection types ----------

export interface FaceResult {
    label: string;       // "With Mask" | "Without Mask" | "Incorrect Mask"
    confidence: number;  // 0.0 to 1.0
    bbox: number[];      // [x, y, width, height]
}

export interface DetectionResponse {
    faces_detected: number;
    results: FaceResult[];
    annotated_image: string;  // base64-encoded JPEG with bounding boxes
}

