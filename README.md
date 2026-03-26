# Job Application Assistant 

An AI-powered web app that helps job seekers tailor their resumes to specific roles. Paste your resume and a job description to get an instant match analysis and AI-rewritten resume bullets.

**Live Demo:** [job-application-assistant-silk.vercel.app](https://job-application-assistant-silk.vercel.app)

---

## Features

- **Match Analysis** — Get a match score out of 100 with detailed strengths, gaps, and actionable advice
- **Bullet Rewriter** — AI rewrites your resume bullets to be stronger and more relevant to the specific job
- **Clean UI** — Simple, professional interface built for fast, focused use

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Vite

**Backend**
- Python
- FastAPI
- Anthropic Claude AI (claude-haiku)

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## How It Works

1. Paste your resume text into the left box
2. Paste the job description into the right box
3. Click **Analyze Match** to get a match score and feedback
4. Click **Rewrite Bullets** to get AI-rewritten resume bullets tailored to the role

---

## Running Locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the backend folder:
```
ANTHROPIC_API_KEY=your-api-key-here
```

Start the server:
```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Project Structure

```
job-application-assistant/
├── backend/
│   ├── main.py          # FastAPI routes and Claude AI integration
│   ├── requirements.txt
│   └── .env             # API key (not committed to GitHub)
└── frontend/
    ├── src/
    │   └── App.jsx      # Main React component
    ├── index.html
    └── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/test-ai` | Test Claude AI connection |
| POST | `/analyze` | Analyze resume vs job description |
| POST | `/rewrite-bullets` | Rewrite resume bullets for a role |

---

Built by [Khaterina Sengchareune](https://github.com/skhaterina) — CS student at SFSU
