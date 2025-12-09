# Physical AI & Humanoid Robotics RAG System Architecture

## Overview

The Physical AI & Humanoid Robotics RAG (Retrieval-Augmented Generation) system is a comprehensive solution that enables intelligent question-answering based on textbook content. The system combines vector search with large language models to provide accurate, context-aware responses to user queries.

## System Architecture

```
┌─────────────────┐    HTTP     ┌──────────────────┐    gRPC/HTTP    ┌─────────────────┐
│                 │  Request    │                  │                 │                 │
│   Frontend      │ ──────────> │   Backend API    │ ──────────────> │   Vector DB     │
│                 │             │                  │                 │                 │
│  (Docusaurus +  │ <────────── │ (FastAPI +       │ <─────────────  │   (Qdrant)      │
│   React Chat)   │  Response   │  Gemini + Cohere)│    Vectors      │                 │
│                 │             │                  │                 │                 │
└─────────────────┘             └──────────────────┘                 └─────────────────┘
        │                                │      ▲                              │
        │                                │      │                              │
        │                                ▼      │                              │
        │                         ┌──────────────────┐                         │
        │                         │ Gemini Response  │                         │
        │                         │ Generation       │                         │
        │                         │                  │                         │
        │                         └──────────────────┘                         │
        │                                │                                     │
        │                                ▼                                     │
        └───────────────────────────────────────────────────────────────────────┘
                                        Query Processing & Response Assembly
```

## Component Breakdown

### 1. Frontend Layer
**Technology**: Docusaurus + React

**Components**:
- **Docusaurus Site**: Static site generator for the textbook content
- **ChatInterface.js**: Floating chat widget that appears on all pages
  - Fixed position at bottom-right corner (60px × 60px button)
  - Expands to full chat interface when clicked
  - Communicates with backend API via HTTP requests
  - Environment variable support: `REACT_APP_BACKEND_URL`

**Features**:
- Real-time chat interface with message history
- Loading indicators and error handling
- Smooth animations and responsive design
- Integration with Docusaurus Layout for global availability

### 2. Backend API Layer
**Technology**: FastAPI + Python

**Components**:
- **main.py**: Entry point and server configuration
- **api_main.py**: FastAPI application with API endpoints
- **config.py**: Configuration management with environment variables
- **retrieval_service.py**: Qdrant integration and document retrieval

**Key Endpoints**:
- `POST /query`: Main RAG endpoint for question answering
- `GET /health`: Overall system health check
- `GET /health/qdrant`: Qdrant connectivity check
- `GET /health/gemini`: Gemini API connectivity check

### 3. Data Processing Layer
**Technology**: Cohere + Custom Processing

**Components**:
- **ingest_data.py**: Enhanced data ingestion script
  - Sitemap processing for web content extraction
  - Local file processing for markdown documents
  - Text chunking with intelligent splitting
  - Cohere embedding generation
  - Qdrant vector storage

**Features**:
- Multi-source content ingestion (web + local files)
- Configurable chunk size (default 1200 characters)
- Error handling and retry mechanisms
- Progress tracking and logging

### 4. Vector Database Layer
**Technology**: Qdrant Cloud/Local

**Configuration**:
- Collection: `humanoid_ai_book`
- Vector Size: 1024 dimensions (Cohere embed-english-v3.0)
- Distance: Cosine similarity
- Payload: Contains source URL/file and text content

### 5. AI Generation Layer
**Technology**: Google Gemini

**Components**:
- **Google Gemini API**: Response generation from context
- **Prompt Engineering**: Context-aware question answering
- **Temperature Control**: Configurable response creativity (default 0.3)

## Data Flow

### Ingestion Flow
1. **Content Discovery**: 
   - Extract URLs from sitemap XML
   - Scan local markdown files in `specs/` directory
2. **Content Extraction**: 
   - Web scraping with trafilatura
   - Markdown parsing and text extraction
3. **Text Processing**: 
   - Intelligent chunking with sentence boundary preservation
   - Text cleaning and normalization
4. **Embedding Generation**: 
   - Cohere API calls with "search_document" input type
   - Vector dimension: 1024
5. **Storage**: 
   - Qdrant upsert operations
   - Metadata storage: source, text, chunk_id

### Query Flow
1. **User Input**: 
   - Question submitted via chat interface
   - HTTP POST request to `/query` endpoint
2. **Embedding Generation**: 
   - Cohere API call with "search_query" input type
   - Create query vector
3. **Vector Search**: 
   - Qdrant similarity search
   - Retrieve top-k most relevant chunks
4. **Context Assembly**: 
   - Combine retrieved documents
   - Format for language model
5. **Response Generation**: 
   - Google Gemini API call
   - Context-aware answer generation
6. **Response Delivery**: 
   - Structured JSON response
   - Frontend display in chat interface

## Environment Variables

### Backend
```
GEMINI_API_KEY=your_google_gemini_key
COHERE_API_KEY=your_cohere_api_key  
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_key
DOCUMENT_COLLECTION_NAME=humanoid_ai_book
SITEMAP_URL=https://textbook-sitemap.com
LOCAL_DOCS_DIR=./specs
EMBEDDING_MODEL=embed-english-v3.0
GEMINI_MODEL=gemini-2.5-flash
```

### Frontend
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Configuration Options

### Embedding Models
- Cohere: `embed-english-v3.0` (recommended)
- Alternative: `multilingual-22-12`

### Vector Database
- Qdrant Cloud (recommended for production)
- Local Qdrant instance (for development)

### LLM Models
- Google Gemini: `gemini-2.5-flash` (recommended)
- Alternative: `gemini-pro`

## Deployment Architecture

### Development Setup
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │    │   Backend   │    │  Qdrant     │
│ (React App) │    │  (FastAPI)  │    │ (Cloud/Local│
│             │    │             │    │   Instance) │
└─────────────┘    └─────────────┘    └─────────────┘
       │                    │                   │
       │  ←──────────────── │ ←──────────────── │
       │    HTTP Requests   │   gRPC queries    │
       └────────────────────┘                   │
                                                │
┌───────────────────────────────────────────────┘
                  AI APIs (Google + Cohere)
```

### Production Setup
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │   Backend   │    │  Qdrant     │
│   (Public)  │    │   (API)     │    │   (Cloud)   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                    │                   │
       │  ←──────────────── │ ←──────────────── │
       │    HTTPS Requests  │   gRPC queries    │
       └────────────────────┘                   │
                                                │
┌───────────────────────────────────────────────┘
         Cloud AI APIs (Google + Cohere)
```

## Security Considerations

1. **API Keys**: Stored in environment variables, never committed to source
2. **CORS**: Proper configuration for frontend-backend communication
3. **Rate Limiting**: Implemented at API level
4. **Input Validation**: Query validation and sanitization
5. **Authentication**: Optional API key authentication for production

## Performance Optimizations

1. **Caching**: Query result caching for frequently asked questions
2. **Indexing**: Vector index optimization in Qdrant
3. **Compression**: Response compression for large documents
4. **Connection Pooling**: Efficient API connection management
5. **Batch Processing**: Chunked vector operations

## Monitoring and Logging

1. **Health Checks**: Service availability monitoring
2. **Metrics**: Query volume, response time, error rates
3. **Logging**: Structured logs for debugging and analysis
4. **Alerts**: Automated notifications for service issues

## Scalability Considerations

1. **Horizontal Scaling**: Backend instances behind load balancer
2. **Database Sharding**: Multiple Qdrant collections for large datasets
3. **CDN Integration**: Static asset delivery optimization
4. **API Gateway**: Request routing and traffic management

This architecture provides a robust, scalable solution for RAG-based question answering with the Physical AI & Humanoid Robotics textbook content.