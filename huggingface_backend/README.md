---
title: Physical AI & Humanoid Robotics RAG System
sdk: docker
app_file: main.py
---

# Physical AI & Humanoid Robotics RAG System

This project implements a Retrieval-Augmented Generation (RAG) system for the Physical AI & Humanoid Robotics textbook. The system allows users to ask questions about the textbook content and receive AI-generated answers based on the documented knowledge.

## Architecture

The system consists of three main components:

1. **Data Ingestion**: Extracts content from web sources (sitemap) and local documents, embeds the content using Cohere, and stores it in Qdrant vector database
2. **Backend API**: FastAPI service that handles queries, retrieves relevant documents from Qdrant, and generates responses using Google Gemini
3. **Frontend Chat Interface**: Docusaurus-integrated chat widget that appears on all pages as a fixed button at the bottom-right corner

## Setup Instructions

### Environment Variables

Before running the application, you need to set up the following environment variables in your Hugging Face Space settings:

- `GEMINI_API_KEY`: Google Gemini API key
- `COHERE_API_KEY`: Cohere API key for embeddings
- `QDRANT_URL`: URL for Qdrant vector database
- `QDRANT_API_KEY`: API key for Qdrant
- `SITEMAP_URL`: URL to the textbook sitemap (default: physical-ai-humanoid-robotics-book sitemap)
- `DOCUMENT_COLLECTION_NAME`: Name of the Qdrant collection (default: humanoid_ai_book)

### Data Ingestion

Before using the query endpoint, you need to ingest the textbook data into the vector database.

Run the ingestion script:
```bash
python ingest_data.py
```

## API Endpoints

- `GET /` - Root endpoint
- `POST /query` - Query the RAG system
    - Request body: `{"query": "your question", "top_k": 5}`
    - Response: `{"query": "your question", "answer": "AI-generated answer", "sources": ["source1", "source2", ...]}`
- `GET /health` - Health check for the API
- `GET /health/qdrant` - Health check for Qdrant connection
- `GET /health/gemini` - Health check for Google Gemini connection

## How It Works

1. The data ingestion process embeds all textbook content into vectors and stores them in Qdrant
2. When a user asks a question through the chat interface, the query is sent to the backend
3. The backend creates an embedding of the query and searches for similar vectors in Qdrant
4. Relevant documents are retrieved and used as context for Google Gemini
5. Gemini generates a response based on the retrieved context
6. The response is sent back to the frontend chat interface

## Environment Variables

- `GEMINI_API_KEY`: Google Gemini API key
- `COHERE_API_KEY`: Cohere API key for embeddings
- `QDRANT_URL`: URL for Qdrant vector database
- `QDRANT_API_KEY`: API key for Qdrant
- `DOCUMENT_COLLECTION_NAME`: Name of the Qdrant collection (default: humanoid_ai_book)
- `SITEMAP_URL`: URL to the textbook sitemap (default: physical-ai-humanoid-robotics-book sitemap)
- `LOCAL_DOCS_DIR`: Directory containing local markdown files (default: ./specs)

## Dependencies

All required dependencies are listed in `requirements.txt` and are installed automatically when the container builds.

## License

See the LICENSE file for details.