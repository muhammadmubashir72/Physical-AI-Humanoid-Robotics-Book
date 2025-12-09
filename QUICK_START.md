# Quick Start Guide: Physical AI & Humanoid Robotics RAG System

## Overview

This guide will help you set up and run the complete Retrieval-Augmented Generation (RAG) system for the Physical AI & Humanoid Robotics textbook. The system includes data ingestion, vector storage in Qdrant, and a chat interface integrated into the Docusaurus frontend.

## Prerequisites

- Python 3.8+
- Node.js 16+
- Access to API keys:
  - Google Gemini API key
  - Cohere API key
  - Qdrant Cloud account (or local instance)

## Step-by-Step Setup

### 1. Clone and Navigate to the Repository

```bash
git clone https://github.com/panaversity/physical-ai-humanoid-robotics.git
cd physical-ai-humanoid-robotics
```

### 2. Backend Setup

First, set up the backend API that handles the RAG functionality:

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env .env  # Creates .env file from the template
```

Update the `.env` file with your API keys and configuration:

```env
GEMINI_API_KEY=your_google_gemini_api_key
COHERE_API_KEY=your_cohere_api_key
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
DOCUMENT_COLLECTION_NAME=humanoid_ai_book
SITEMAP_URL=https://physical-ai-humanoid-robotics-book-one-beta.vercel.app/sitemap.xml
LOCAL_DOCS_DIR=./specs
```

### 4. Data Ingestion

Run the data ingestion script to process textbook content and store it in Qdrant:

```bash
python ingest_data.py
```

This will:
- Extract content from the sitemap URLs
- Process local markdown files from the `specs` directory
- Create embeddings using Cohere
- Store the vectors in Qdrant for retrieval

Wait until the ingestion is complete (it will show "✔️ Ingestion completed!").

### 5. Start the Backend API

In the same backend directory, start the API server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`.

### 6. Frontend Setup

Open a new terminal and set up the frontend:

```bash
cd frontend  # Navigate back to the main project if needed, then to frontend

# Install dependencies
npm install

# Set up environment for development
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env

# Start the development server
npm run start
```

### 7. Using the Chat Interface

Once the frontend is running:

1. Visit `http://localhost:3000` in your browser
2. You'll see the textbook content as normal
3. Look for the 💬 chat button at the bottom-right corner of any page
4. Click it to open the chat interface
5. Ask questions about the textbook content and receive AI-powered responses

## Architecture Overview

```
                    ┌─────────────────────┐
                    │   Frontend (React)  │
                    │  Docusaurus Website │
                    │  ┌─────────────────┐│
                    │  │ ChatInterface   ││
                    │  │  (Floating 💬)  ││
                    │  └─────────────────┘│
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │    Backend (FastAPI)│
                    │  http://localhost:8000
                    │  ┌─────────────────┐│
                    │  │  /query         ││
                    │  └─────────────────┘│
                    └─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Google        │ │    Cohere       │ │    Qdrant       │
│   Gemini        │ │    Embeddings   │ │   Vector DB     │
│ (Generates      │ │ (Creates        │ │ (Stores &       │
│  responses)     │ │  embeddings)    │ │  retrieves)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Troubleshooting

1. **Chat button not appearing**: Make sure you've properly integrated the ChatInterface in the Layout component (it should be in `frontend/src/theme/Layout/index.js`)

2. **Backend connection errors**: Verify that `REACT_APP_BACKEND_URL` is set correctly in the frontend `.env` file

3. **Qdrant connection issues**: Check your Qdrant URL and API key in the backend `.env` file

4. **API keys not working**: Verify all API keys are valid and properly formatted in the `.env` file

## Next Steps

- Customize the ingestion script to include your own documents
- Modify the chat interface styling in `ChatInterface.js`
- Add more modules to the textbook content
- Set up a production deployment