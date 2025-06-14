from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
import os
from tempfile import TemporaryDirectory
import zipfile
import pandas as pd
import io
from gemini_matcher import score_resume
from scorer import parse_gemini_response, rank_resumes
from utils import get_text_from_file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/rank/")
async def rank_resumes_api(uploads: list[UploadFile] = File(...)):
    jd_text = None
    resumes = []

    with TemporaryDirectory() as tmpdir:
        for upload in uploads:
            ext = os.path.splitext(upload.filename)[1].lower()
            temp_path = os.path.join(tmpdir, upload.filename)

            with open(temp_path, "wb") as f:
                f.write(await upload.read())

            if "jd" in upload.filename.lower() or "job" in upload.filename.lower():
                jd_text = get_text_from_file(temp_path)
            else:
                resumes.append((upload.filename, temp_path))

        if not jd_text:
            return JSONResponse(status_code=400, content={"error": "JD file not found. Please include a file with 'jd' or 'job' in the name."})

        results = []
        for filename, path in resumes:
            if filename.endswith(".zip"):
                with zipfile.ZipFile(path, 'r') as zip_ref:
                    zip_ref.extractall(tmpdir)
                for root, _, files in os.walk(tmpdir):
                    for fname in files:
                        if fname.lower().endswith((".pdf", ".txt")):
                            full_path = os.path.join(root, fname)
                            resume_text = get_text_from_file(full_path)
                            raw = score_resume(jd_text, resume_text)
                            parsed = parse_gemini_response(raw)
                            parsed["filename"] = fname
                            results.append(parsed)
            elif filename.endswith((".pdf", ".txt")):
                resume_text = get_text_from_file(path)
                raw = score_resume(jd_text, resume_text)
                parsed = parse_gemini_response(raw)
                parsed["filename"] = filename
                results.append(parsed)

    ranked = rank_resumes(results)
    df = pd.DataFrame(ranked)
    csv_stream = io.StringIO()
    df.to_csv(csv_stream, index=False)
    csv_bytes = io.BytesIO(csv_stream.getvalue().encode())

    return StreamingResponse(
        content=csv_bytes,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=ranked_resumes.csv"}
    )
