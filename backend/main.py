from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import fitz  # pymupdf for pdf text extraction
from dotenv import load_dotenv
from pydantic import BaseModel

# langchain + gemini imports
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
# from langchain.prompts import PromptTemplate
# from langchain.llms import GoogleGenerativeAI
# from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import tempfile

load_dotenv()


# create fastapi instance
app = FastAPI()

# allow frontend request
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://fast-api-pdf-chatbot.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# define where upload files will be stored

UPLOAD_DIR = "uploads"
TEMP_DIR = "temp"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# # in memory dictionary to temporarily pdf text by file name
# pdf_text_storage = {}


# function to extract text from pdf
def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()

    return text


# api endpoint to upload a pdf and extract its text
@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {"error": "only pdf are allowed"}

    file_location = os.path.join(UPLOAD_DIR, file.filename)

    # save the uploaded file to the disk
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # extract text from the pdf
    extracted_text = extract_text_from_pdf(file_location)

    return {"message": f"{file.filename} uploaded successfully",
            "preview": extracted_text[:300]  # first 300 characters as preview
            }

# input schema for the questions


class QuestionRequest(BaseModel):
    filename: str
    question: str

# ask question about pdf endpoint


@app.post("/ask-question/")
async def ask_question(file: UploadFile = File(...), question: str = Form(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "only pdf file are allowed"}
    try:
        # save the uploaded pdf temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf", dir=TEMP_DIR) as tmp:
            tmp.write(await file.read())
            file_path = tmp.name

        # extract text frpm pdf
        extracted_text = extract_text_from_pdf(file_path)

        # wrap text into langchain document
        docs = [Document(page_content=extracted_text)]

        # load gemini model
        chain = load_qa_chain(
            ChatGoogleGenerativeAI(
                model="gemini-2.0-flash-001",
                google_api_key=os.getenv("GOOGLE_API_KEY")),
            chain_type="stuff",
        )

        # generating answer from gemini
        result = chain.run(input_documents=docs, question=question)

        return {"answer": result, "preview": extracted_text[:300]}

    except Exception as e:
        return {"error": str(e)}
