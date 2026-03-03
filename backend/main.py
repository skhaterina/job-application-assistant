from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from dotenv import load_dotenv
import os #python library, lets you interact with os, read environment variables
from pydantic import BaseModel

#allows .env read apikey into this program

load_dotenv() #reads .env file

#setting up FastApi app
app = FastAPI()

#this allows your react front ends to talk to your backend
app.add_middleware(
    CORSMiddleware,
    #allows this ip to communicunite with backend, this is react front ends address
    allow_origins=["http://localhost:5173"],
    #allow cookies and auth headers to be sent
    allow_credentials=True,
    # * means allow all 
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Anthropic(api_key = os.getenv("ANTHROPIC_API_KEY"))

#this is the api route
# when someone sends a get request to the / address, it will run this function
@app.get("/")
def read_root():
    return {"message": "Job Application Assistant API is running!"}


@app.get("/test-ai")
def test_ai():
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=100,
        messages=[
            # list of content blocks in claudes responce

            {"role": "user", "content": "Say hello in one sentence."}
        ]
    )
    #grabbing first item in list and grab test from content block
    return {"response": message.content[0].text}


# class expects values in string
#fastapi will determine if data is correct
class AnalyzeRequest(BaseModel):

    resume: str
    job_description: str

#sending data to /analyze
#function parameter takes data sent to this route, validates it against our class blueprint,
#passes it in as request
@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": f"""
                You are a helpful job application assistant.
                
                Given this resume:
                {request.resume}
                
                And this job description:
                {request.job_description}
                
                Please provide:
                1. A match score out of 100
                2. Top 3 strengths that match the job
                3. Top 3 gaps or missing skills
                4. One sentence of overall advice
                
                Be specific and concise.
                """
            }
        ]
    )
    return {"analysis": message.content[0].text}

@app.post("/rewrite-bullets")
def rewrite_bullets(request: AnalyzeRequest):
    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": f"""
                You are an expert resume writer.
                
                Given this resume:
                {request.resume}
                
                And this job description:
                {request.job_description}
                
                Rewrite the resume bullet points to better match the job description.
                Make them more specific, impactful, and relevant.
                Use strong action verbs and quantify achievements where possible.
                Keep the same number of bullets but make them stronger.
                
                Format the output clearly with the original bullet followed by the rewritten version.
                """
            }
        ]
    )
    return {"rewritten": message.content[0].text}