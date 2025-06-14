from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DB_NAME")
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
print(DB_NAME)
def get_interviewee_email(interviewee_id):
    interviewee = db.interviewees.find_one({"_id": interviewee_id})
    return interviewee.get("email") if interviewee else None
