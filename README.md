# MaskGuard AI — Intelligent Face Mask Compliance Monitoring

An AI-powered real-time face mask detection and compliance monitoring system. Detect multiple faces, analyze mask compliance, and explore how Convolutional Neural Networks (CNNs) process images through an interactive simulation.

![MaskGuard AI](https://img.shields.io/badge/Status-Active-brightgreen)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js)
![PyTorch](https://img.shields.io/badge/AI-PyTorch-EE4C2C?logo=pytorch)

## 🌟 Key Features

- **Real-Time Detection**: Lightning-fast inference (< 100ms) for detecting face masks in images.
- **Multi-Face Tracking**: Accurately identifies multiple faces in a single frame and draws styled bounding boxes.
- **3-Class Classification**: Classifies faces into three categories: `With Mask`, `Without Mask`, and `Incorrect Mask`.
- **Interactive CNN Simulation**: Educational "How It Works" module that visualizes the AI pipeline (Preprocessing, Convolution, ReLU, Pooling, FC Layer).
- **Premium UI/UX**: State-of-the-art dark mode design with glassmorphism, neon glows, and smooth micro-animations using Framer Motion.

## 🏗️ Architecture & Tech Stack

The system is divided into two decoupled components:

### Frontend (Next.js)
- **Framework**: Next.js 14 (App Router), React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Location**: `/frontend`

### Backend (FastAPI / PyTorch)
- **API Framework**: FastAPI
- **Model Architecture**: Faster R-CNN with a ResNet50-FPN backbone
- **Image Processing**: OpenCV, Pillow, Torchvision
- **Location**: `/` and `/app`

## 🚀 Live Demo & Links

- **Backend API Deployment**: [Hugging Face Spaces](https://malay911-facemask-detection.hf.space)
- **GitHub Repository**: [facemask_detection_DL](https://github.com/Malay911/facemask_detection_DL)

## 💻 Local Development Setup

### 1. Backend Setup

The backend serves the PyTorch model via a REST API.

```bash
# Clone the repository
git clone https://github.com/Malay911/facemask_detection_DL.git
cd facemask_detection_DL/facemask_detection

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Linux/Mac

# Install backend dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.app:app --reload
```
The API will be live at: `http://localhost:8000`

### 2. Frontend Setup

The frontend consumes the FastAPI backend.

```bash
# Navigate to the frontend directory
cd /frontend

# Install Node.js dependencies
npm install

# Run the Next.js development server
npm run dev
```
The web app will be accessible at: `http://localhost:3000`

## 📡 API Endpoints

The backend exposes the following key endpoints:

- `GET /health` : API status check.
- `POST /detect` : Accepts an image file and returns bounding boxes, labels, confidences, and a base64 encoded annotated image.
- `POST /predict` : Legacy single-face prediction.
- `POST /predict/base64` : Base64 string prediction.

Detailed API documentation (Swagger UI) is available at `/docs` when the backend is running.

## 📄 License

This project is licensed under the MIT License.
