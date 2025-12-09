# Deploying to Hugging Face Spaces

This guide provides step-by-step instructions for deploying the backend to Hugging Face Spaces.

## Method 1: Manual Upload

1. Create a zip file of the entire `huggingface_backend` folder:
   - Select all files and folders in the `huggingface_backend` directory
   - Right-click and choose "Send to" > "Compressed (zipped) folder"

2. Go to [huggingface.co/spaces](https://huggingface.co/spaces) and click "Create new Space"
   - Enter a name for your Space
   - Choose SDK: "Docker"
   - Choose Hardware: Select based on your needs (CPU or GPU)
   - Choose Visibility: Public or Private

3. Upload the zip file to your Space:
   - In your Space repository, click "Files" at the top
   - Click "Add file" > "Upload files"
   - Drag and drop your zip file

4. Extract the files in the Hugging Face Space environment

## Method 2: Git Clone and Push (Recommended)

1. Create your Space on Hugging Face:
   - Go to [huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Enter a name for your Space
   - Choose SDK: "Docker"
   - Choose Hardware: Select based on your needs (CPU or GPU)
   - Choose Visibility: Public or Private
   - Click "Create Space"

2. Clone your Space repository:
   ```bash
   git clone https://huggingface.co/spaces/your-username/your-space-name
   cd your-space-name
   ```

3. Copy all files from the `huggingface_backend` directory to your local Space folder:
   - Copy all files from `huggingface_backend` to the local Space folder
   - These include:
     - `Dockerfile`
     - `requirements.txt`
     - `.dockerignore`
     - `app/` directory
     - `services/` directory
     - `main.py`
     - `api_main.py`
     - `config.py`
     - `ingest_data.py`
     - `ingest_data_enhanced.py`
     - `.env.example`
     - `README.md`
     - `DEPLOYMENT.md`
     - `docker-compose.yml`
     - `QUICK_START.md`
     - `SYSTEM_OVERVIEW.md`
     - `test_*.py` files

4. Add and commit the files:
   ```bash
   git add .
   git commit -m "Add RAG Chatbot backend files"
   git push
   ```

## Setting Up Environment Variables

After your Space is created, you need to configure the environment variables:

1. Go to your Space page on Hugging Face
2. Click on "Files" tab
3. Look for "Settings" or "Environment Variables" (usually in the left sidebar)
4. Add the following environment variables with your own values:

   ```
   GEMINI_API_KEY=your_actual_gemini_api_key
   COHERE_API_KEY=your_actual_cohere_api_key
   QDRANT_URL=your_actual_qdrant_url
   QDRANT_API_KEY=your_actual_qdrant_api_key
   SITEMAP_URL=https://physical-ai-humanoid-robotics-book-one-beta.vercel.app/sitemap.xml
   ```

## Running the Application

The application should automatically start once deployed. The Dockerfile is configured to:

1. Install all required dependencies from requirements.txt
2. Copy the application files
3. Start the FastAPI application on port 8000

## Important Notes

- Make sure to use your actual API keys instead of placeholder values
- The ingestion process (ingest_data.py) needs to be run once to populate the Qdrant database
- The application uses Cohere for embeddings and Google Gemini for question answering
- Qdrant is used as the vector database for similarity search

## Troubleshooting

If your Space fails to build:
1. Check the build logs for error details
2. Ensure all required environment variables are set
3. Verify that the Dockerfile and requirements.txt are correctly formatted

If your application fails to run:
1. Check the runtime logs
2. Verify that all API keys are valid and have sufficient permissions
3. Confirm that the Qdrant connection is working

## Updating Your Space

To update your Space after the initial deployment:
1. Make changes to your local repository
2. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. The Space will automatically rebuild with your changes