import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("GOOGLE_API_KEY missing")

# Configure the client with your API key
genai.configure(api_key=API_KEY)

def get_embedding(text: str):
    # Using the current embedding model
    embedding_model = genai.embed_content(
        model="models/embedding-001",
        content=text,
        task_type="retrieval_document"  # or "retrieval_query" for queries
    )
    return embedding_model['embedding']

def generate_answer(prompt: str):
    # Using the current text generation model
    model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.4
        )
    )
    return response.text