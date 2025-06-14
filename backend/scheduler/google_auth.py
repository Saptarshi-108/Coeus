import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = os.getenv("GOOGLE_API_SCOPES")

def get_credentials():
    creds = None
    token_path = 'token.json'
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                os.getenv("GOOGLE_API_CLIENT_SECRET_FILE"), SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    return creds

def get_calendar_service():
    creds = get_credentials()
    return build('calendar', 'v3', credentials=creds)

def get_gmail_service():
    creds = get_credentials()
    return build('gmail', 'v1', credentials=creds)
