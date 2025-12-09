#!/bin/bash
# Deployment script for Hugging Face Spaces

# This script sets up the backend for Hugging Face Spaces deployment

echo "Starting Hugging Face Spaces deployment setup..."

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if environment variables are set
if [ -z "$GEMINI_API_KEY" ] || [ -z "$COHERE_API_KEY" ] || [ -z "$QDRANT_URL" ] || [ -z "$QDRANT_API_KEY" ]; then
    echo "Warning: One or more required environment variables are not set!"
    echo "Please set GEMINI_API_KEY, COHERE_API_KEY, QDRANT_URL, and QDRANT_API_KEY"
fi

# Start the application
echo "Starting the FastAPI application..."
exec uvicorn app.api_main:app --host 0.0.0.0 --port $PORT