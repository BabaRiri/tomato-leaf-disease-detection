from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import os
import sys

# Function to get an environment variable and exit if it's not set
def get_env_variable(var_name):
    """
    Retrieves the value of an environment variable.
    If the variable is not set, it prints an error message and exits the program.
    :param var_name: The name of the environment variable
    :param default_value: Optional default value if the variable is not set (default is None)
    :return: The value of the environment variable or the default value
    """
    value = os.environ.get(var_name)
    if value is None:
        print(f"Error: The environment variable '{var_name}' is not set.")
        sys.exit(1)
    return value

react_url = get_env_variable("REACT_URI")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

origins.append(react_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_DIR = os.getenv("MODEL_DIR", "models/3")
try:
    MODEL = tf.keras.models.load_model(MODEL_DIR)
except Exception as e:
    raise RuntimeError(f"Failed to load model. Error: {e}")

CLASS_NAMES = [
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

@app.get("/ping")
async def ping():
    return "Nawanadem!"

def read_file_as_image(data: bytes) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    # Get the port from the environment variable
    port = int(get_env_variable('PORT'))
    # uvicorn.run(app, host='0.0.0.0', port=port)
    uvicorn.run(app, host='localhost', port=port)
