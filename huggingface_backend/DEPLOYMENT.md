# Hugging Face Spaces Deployment Guide

This document provides instructions for deploying the backend to Hugging Face Spaces using Docker.

## Prerequisites

1. A Hugging Face account
2. Your Space must be created with Docker runtime
3. API keys for:
   - Google Gemini
   - Cohere
   - Qdrant (if using a cloud instance)

## Deployment Steps

### Option 1: Direct Deployment to Hugging Face Spaces

1. Fork this repository or create a new repository in your Hugging Face account
2. Push all the files from the `backend` directory to your Hugging Face repository
3. Create a new Space with the following settings:
   - Runtime: Docker
   - Hardware: Choose based on your needs (at least CPU with 4GB RAM recommended)
   - Visibility: Public or Private as per your preference

### Option 2: Using Git and Hugging Face CLI

1. Install Hugging Face Hub CLI:
```bash
pip install huggingface_hub
```

2. Login to your Hugging Face account:
```bash
huggingface-cli login
```

3. Create a new Space:
```bash
huggingface-cli space create-backend --repo-id your-username/your-space-name --hardware cpu-basic --sdk docker
```

4. Clone your Space repository:
```bash
git clone https://huggingface.co/spaces/your-username/your-space-name
cd your-space-name
```

5. Copy all the backend files:
```bash
cp -r /path/to/your/backend/* .
git add .
git commit -m "Add backend files for deployment"
git push
```

## Environment Variables Setup

In your Hugging Face Space settings, add the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `COHERE_API_KEY`: Your Cohere API key
- `QDRANT_URL`: Your Qdrant instance URL
- `QDRANT_API_KEY`: Your Qdrant API key (if required)
- `SITEMAP_URL`: URL to your sitemap

## Docker Configuration for Hugging Face Spaces

The Dockerfile is already configured for Hugging Face Spaces with the following features:
- Uses Python 3.10 slim image for minimal size
- Installs necessary dependencies from requirements.txt
- Sets up the working directory properly
- Exposes port 8000
- Runs the FastAPI application with uvicorn

## Architecture

The Spaces deployment includes:
- FastAPI backend application
- Qdrant vector database (either local container or external)
- Integration with Google Gemini and Cohere APIs

## Testing Your Deployment

Once deployed, you can test your API using:

Root endpoint:
```
https://your-username-your-space-name.hf.space/
```

Health check:
```
https://your-username-your-space-name.hf.space/health
```

API endpoint:
```
https://your-username-your-space-name.hf.space/query
```

## Troubleshooting

### Common Issues:

1. **API Keys Not Working**
   - Double-check that environment variables are set correctly in your Space settings
   - Ensure there are no extra spaces or characters in the keys

2. **Port Issues**
   - Make sure the application binds to `0.0.0.0:8000` (this is already configured)

3. **Memory Issues**
   - Hugging Face Spaces have limited memory; ensure you select appropriate hardware

4. **Build Errors**
   - Check the Space logs for build errors
   - Some dependencies might need to be changed for the Spaces environment

## Scaling Considerations

- Free Spaces are put to sleep after 48 hours of inactivity
- For continuous availability, consider upgrading to a hardware tier
- Monitor your Space usage through the Hugging Face dashboard

## Security Notes

- Never commit API keys to the repository
- Use environment variables for all sensitive information
- The CORS middleware allows all origins by default - consider restricting in production
- Ensure your Qdrant instance is secure if using external services

## Updating Your Deployment

To update your Space:
1. Make changes to your local repository
2. Commit and push the changes:
```bash
git add .
git commit -m "Update description"
git push
```
3. The Space will automatically rebuild with the new changes

## Resources

- [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces-overview)
- [Hugging Face Docker Spaces Guide](https://huggingface.co/docs/hub/spaces-docker)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)