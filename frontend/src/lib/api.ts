import axios from "axios";
import {
    HealthResponse,
    PredictionResponse,
    DetectionResponse,
} from "@/types/prediction";

// Axios instance pointing to the FastAPI backend
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    timeout: 30000,
});

// ---------- Legacy single-face prediction ----------

/**
 * Send an image file to the prediction endpoint (single face).
 */
export async function predictImage(file: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<PredictionResponse>("/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

/**
 * Check if the FastAPI backend is online and the model is loaded.
 */
export async function healthCheck(): Promise<HealthResponse> {
    const { data } = await api.get<HealthResponse>("/health");
    return data;
}

// ---------- Multi-face detection ----------

/**
 * Detect multiple faces in an image and classify each for mask compliance.
 * Returns face count, per-face results, and annotated image with bounding boxes.
 */
export async function detectFaces(file: File): Promise<DetectionResponse> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post<DetectionResponse>("/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}
