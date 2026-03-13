# Signflo

Signflo is a full-stack web application designed to bridge the communication gap using AI-powered sign language translation. It features robust models that convert sign language to text via webcam input and translate text/speech into animated sign language using 3D avatars.

## Features

- **Sign to Text**: Real-time sign language recognition using your webcam. Detects gestures and translates them to text instantly.
- **Learn Signs (Text to Sign)**: Converts typed text into localized sign language animations, performed by a 3D avatar.
- **GMeet Extension**: An integrated solution to bring sign language interpretation natively to Google Meet.
- **Modern UI/UX**: A sleek, accessible, and responsive dark-themed user interface with glassmorphism and smooth animations.

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript, built on Vite
- **Styling**: Tailwind CSS v4, Framer Motion for animations
- **Routing**: React Router v7
- **3D Graphics**: Three.js, React Three Fiber (for 3D avatar animations)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **Machine Learning**: MediaPipe Tasks Hand Landmarker, OpenCV, NumPy
- **Capabilities**: Custom heuristic-based hand gesture detection and translation endpoints.

## Project Structure

```bash
Signflo/
├── frontend/          # React + Vite web application
│   ├── public/        # Static assets
│   ├── src/           # Frontend source code (Pages, Components, Hooks, Layouts, Utils)
│   ├── package.json   # Frontend JS dependencies
│   └── vite.config.ts # Vite configuration
└── backend/           # FastAPI backend server
    ├── main.py        # API routing and application entry point
    ├── ml_pipeline.py # MediaPipe image processing and heuristic classification logic
    └── hand_landmarker.task # MediaPipe model asset
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python (3.9+ recommended)

### 1. Start the Backend
Navigate to the `backend` directory, install required dependencies (FastAPI, Uvicorn, MediaPipe, OpenCV, Python-Multipart, Pydantic), and start the server.

```bash
cd backend
# Example using pip and a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn mediapipe opencv-python pydantic python-multipart
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The backend will run on `http://localhost:8000`.

### 2. Start the Frontend
Navigate to the `frontend` directory, install NPM packages, and start the Vite development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the URL provided by Vite (typically `http://localhost:5173`).

---

**Note**: The project is continuously evolving. Ensure the hand landmarking model (`hand_landmarker.task`) is present in the backend folder to enable webcam-based gesture recognition.
