import cv2
import numpy as np
import mediapipe as mp
import base64
from typing import Optional, Tuple

# Setup Tasks API
BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Initialize the landmarker statically so we don't reload it every frame
options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='hand_landmarker.task'),
    running_mode=VisionRunningMode.IMAGE,
    num_hands=2
)
landmarker = HandLandmarker.create_from_options(options)

def simple_heuristic_classifier(hand_landmarks) -> str:
    # In the Tasks API, hand_landmarks is a list of NormalizedLandmark objects
    # We can access them by index. 
    # For standard 21-point tracking:
    # 4 = THUMB_TIP, 3 = THUMB_IP
    # 8 = INDEX_FINGER_TIP, 5 = INDEX_FINGER_MCP
    # 12 = MIDDLE_FINGER_TIP, 9 = MIDDLE_FINGER_MCP
    # 16 = RING_FINGER_TIP, 13 = RING_FINGER_MCP
    # 20 = PINKY_TIP, 17 = PINKY_MCP
    
    index_tip = hand_landmarks[8].y
    index_mcp = hand_landmarks[5].y
    
    middle_tip = hand_landmarks[12].y
    middle_mcp = hand_landmarks[9].y
    
    ring_tip = hand_landmarks[16].y
    ring_mcp = hand_landmarks[13].y
    
    pinky_tip = hand_landmarks[20].y
    pinky_mcp = hand_landmarks[17].y
    
    thumb_tip = hand_landmarks[4].x
    thumb_ip = hand_landmarks[3].x

    is_index_raised = index_tip < index_mcp
    is_middle_raised = middle_tip < middle_mcp
    is_ring_raised = ring_tip < ring_mcp
    is_pinky_raised = pinky_tip < pinky_mcp
    is_thumb_out = abs(thumb_tip - thumb_ip) > 0.05 

    if is_index_raised and is_middle_raised and not is_ring_raised and not is_pinky_raised:
        return "Peace"
    elif is_thumb_out and not is_index_raised and not is_middle_raised and not is_ring_raised and not is_pinky_raised:
        return "Good"
    elif is_index_raised and not is_middle_raised and not is_ring_raised and not is_pinky_raised:
        return "One"
    elif is_index_raised and is_middle_raised and is_ring_raised and is_pinky_raised and is_thumb_out:
        return "Hello"
    elif not is_index_raised and not is_middle_raised and not is_ring_raised and not is_pinky_raised and not is_thumb_out:
        return "Fist"
        
    return "Detecting..."

def process_frame(image_bytes: bytes) -> Tuple[str, Optional[str]]:
    """
    Decodes the image bytes, runs MediaPipe Tasks HandLandmarker, 
    and runs a simple classifier. Returns (predicted_text, base64_annotated_image)
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        return "Error decoding image", None
        
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Convert numpy array to mp Image
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)
    
    # Process
    detection_result = landmarker.detect(mp_image)
    
    predicted_text = "No Hands Detected"
    annotated_b64 = None
    
    if detection_result.hand_landmarks:
        first_hand = detection_result.hand_landmarks[0]
        predicted_text = simple_heuristic_classifier(first_hand)
        
        # Simple rendering for debug, drawing dots
        annotated_image = image.copy()
        for idx_hand, hand_marks in enumerate(detection_result.hand_landmarks):
            for lm in hand_marks:
                x = int(lm.x * image.shape[1])
                y = int(lm.y * image.shape[0])
                cv2.circle(annotated_image, (x, y), 5, (0, 255, 0), -1)
                
        _, buffer = cv2.imencode('.jpg', annotated_image)
        annotated_b64 = base64.b64encode(buffer).decode('utf-8')
        
    return predicted_text, annotated_b64
