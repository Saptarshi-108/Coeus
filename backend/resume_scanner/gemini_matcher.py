import google.generativeai as genai
import os
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

def score_resume(jd_text, resume_text):
    prompt = f"""
You are an expert HR assistant. Evaluate the following resume against the job description.
Respond in JSON with:
- Total Score (0–100)
- Skills Match (/40)
- Experience Relevance (/25)
- Education Fit (/15)
- Certifications (/10)
- Communication (/10)
- Shortlist: Yes/No
- Justification: 2-3 lines

Job Description:
{jd_text}

Resume:
{resume_text}
"""
    response = model.generate_content(prompt)
    return response.text