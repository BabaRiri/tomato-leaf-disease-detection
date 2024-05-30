# Use an official Python runtime as a parent image
FROM python:3.8-slim AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file and install any needed packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Explicitly copy the model directory
COPY models /usr/src/app/models

# Set environment variable for the model directory
ENV MODEL_DIR=/usr/src/app/models/1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Expose port 8000
EXPOSE 8000
