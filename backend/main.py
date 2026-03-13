from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
from ml_pipeline import process_frame

app = FastAPI(title="Signflo Backend")

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextPayload(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Signflo Backend API is running."}

@app.post("/api/sign-to-text")
async def sign_to_text(frame: UploadFile = File(...)):
    """
    Endpoint for sign language to text model.
    Receives a webcam frame, runs MediaPipe, and returns predicted text.
    """
    # Read the image bytes
    image_bytes = await frame.read()
    
    # Process the frame with our ML pipeline
    predicted_text, annotated_image_b64 = process_frame(image_bytes)
    
    # Return the prediction and optionally the annotated frame
    return {
        "text": predicted_text,
        "annotated_frame": annotated_image_b64
    }

@app.post("/api/text-to-sign")
async def text_to_sign(payload: TextPayload):
    """
    Mock endpoint for text to sign language mapping.
    Receives text and would return animation sequence names.
    """
    # Simulate processing time
    time.sleep(0.5)
    
    words = payload.text.lower().split()
    # Mock mapping words to animation names
    animations = [f"anim_{word}" for word in words]
    
    return {"animations": animations}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
