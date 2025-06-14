from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
import tempfile
import os
import numpy as np

from document_loader import load_policy_text, split_text
from gemini_client import get_embedding, generate_answer
from vector_store import VectorStore

app = FastAPI(title="HR Policy Chatbot with PDF Upload & Gemini")

# Initialize vector store with embedding dimension 768 (embedding dims may vary by model)
VECTOR_DIM = 768
vector_store = VectorStore(dim=VECTOR_DIM)

class QueryRequest(BaseModel):
    question: str

@app.post("/upload_policy_pdf")
async def upload_policy_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        # Extract text and split
        full_text = load_policy_text(tmp_path)
        os.unlink(tmp_path)  # clean temp file

        chunks = split_text(full_text)

        # Embed chunks and add to vector store
        embeddings = []
        for chunk in chunks:
            emb = get_embedding(chunk)
            embeddings.append(emb)
        embeddings_np = np.array(embeddings).astype("float32")

        # Clear old data and add new (optional: you can improve multi-doc support)
        vector_store.index.reset()
        vector_store.texts.clear()
        vector_store.add(embeddings_np, chunks)

        return {"message": f"Policy PDF uploaded and processed with {len(chunks)} chunks."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")

@app.post("/chat")
def chat_bot(request: QueryRequest):
    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    if len(vector_store.texts) == 0:
        raise HTTPException(status_code=400, detail="No policy uploaded. Please upload a PDF policy first.")

    # Embed question
    question_emb = np.array([get_embedding(question)]).astype("float32")

    # Retrieve top 3 relevant chunks
    relevant_chunks = vector_store.search(question_emb, top_k=3)

    # Prepare prompt
    context = "\n\n".join(relevant_chunks)
    prompt = f"""
You are an expert HR assistant. Using the following HR policy excerpts, answer the user's question precisely and professionally.

HR Policy Excerpts:
{context}

User Question: {question}
"""

    answer = generate_answer(prompt)
    return {"answer": answer}
