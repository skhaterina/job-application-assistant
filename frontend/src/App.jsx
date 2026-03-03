import { useState } from "react"
import ReactMarkdown from "react-markdown"

const markdownComponents = {
  h1: ({children}) => <h1 style={{fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: '#0f172a'}}>{children}</h1>,
  h2: ({children}) => <h2 style={{fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', marginTop: '1.25rem', color: '#0f172a'}}>{children}</h2>,
  h3: ({children}) => <h3 style={{fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '1rem', color: '#334155'}}>{children}</h3>,
  p: ({children}) => <p style={{marginBottom: '0.6rem', color: '#475569', lineHeight: '1.7'}}>{children}</p>,
  li: ({children}) => <li style={{marginLeft: '1.25rem', marginBottom: '0.4rem', color: '#475569', lineHeight: '1.6'}}>{children}</li>,
  strong: ({children}) => <strong style={{fontWeight: '700', color: '#0f172a'}}>{children}</strong>,
}

export default function App() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [rewritten, setRewritten] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeAction, setActiveAction] = useState("")

  async function handleAnalyze() {
    setLoading(true)
    setActiveAction("analyze")
    setAnalysis("")

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({resume, job_description: jobDescription})
    })

    const data = await response.json()
    setAnalysis(data.analysis)
    setLoading(false)
    setActiveAction("")
  }

  async function handleRewrite() {
    setLoading(true)
    setActiveAction("rewrite")
    setRewritten("")

    const response = await fetch("http://127.0.0.1:8000/rewrite-bullets", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({resume, job_description: jobDescription})
    })

    const data = await response.json()
    setRewritten(data.rewritten)
    setLoading(false)
    setActiveAction("")
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Georgia', serif",
    }}>
      {/* Header */}
      <div style={{
        background: '#0f172a',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderBottom: '3px solid #3b82f6',
      }}>
        <div style={{
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: '#64748b',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          fontFamily: "'Georgia', serif",
        }}>
          AI-Powered
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#f8fafc',
          margin: 0,
          letterSpacing: '-0.02em',
          fontFamily: "'Georgia', serif",
        }}>
          Job Application Assistant
        </h1>
        <p style={{
          color: '#94a3b8',
          marginTop: '0.75rem',
          fontSize: '1rem',
          fontFamily: "'Georgia', serif",
        }}>
          Analyze your fit. Strengthen your resume. Land the role.
        </p>
      </div>

      {/* Main content */}
      <div style={{maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem'}}>

        {/* Input section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#64748b',
              marginBottom: '0.6rem',
              fontFamily: "'Georgia', serif",
            }}>
              Your Resume
            </label>
            <textarea
              style={{
                width: '100%',
                height: '280px',
                padding: '1rem',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                color: '#334155',
                background: '#fff',
                resize: 'vertical',
                outline: 'none',
                fontFamily: "'Georgia', serif",
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              placeholder="Paste your resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#64748b',
              marginBottom: '0.6rem',
              fontFamily: "'Georgia', serif",
            }}>
              Job Description
            </label>
            <textarea
              style={{
                width: '100%',
                height: '280px',
                padding: '1rem',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                color: '#334155',
                background: '#fff',
                resize: 'vertical',
                outline: 'none',
                fontFamily: "'Georgia', serif",
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem'}}>
          <button
            onClick={handleAnalyze}
            disabled={loading || !resume || !jobDescription}
            style={{
              background: loading && activeAction === 'analyze' ? '#1e40af' : '#1d4ed8',
              color: '#fff',
              border: 'none',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              cursor: loading || !resume || !jobDescription ? 'not-allowed' : 'pointer',
              opacity: loading || !resume || !jobDescription ? 0.6 : 1,
              fontFamily: "'Georgia', serif",
              transition: 'all 0.2s',
            }}
          >
            {loading && activeAction === 'analyze' ? '⏳ Analyzing...' : '🔍 Analyze Match'}
          </button>

          <button
            onClick={handleRewrite}
            disabled={loading || !resume || !jobDescription}
            style={{
              background: '#fff',
              color: '#1d4ed8',
              border: '1.5px solid #1d4ed8',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              cursor: loading || !resume || !jobDescription ? 'not-allowed' : 'pointer',
              opacity: loading || !resume || !jobDescription ? 0.6 : 1,
              fontFamily: "'Georgia', serif",
              transition: 'all 0.2s',
            }}
          >
            {loading && activeAction === 'rewrite' ? '⏳ Rewriting...' : '✏️ Rewrite Bullets'}
          </button>
        </div>

        {/* Results */}
        {analysis && (
          <div style={{
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '10px',
            padding: '2rem',
            marginBottom: '1.5rem',
            borderLeft: '4px solid #3b82f6',
          }}>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#3b82f6',
              fontWeight: '600',
              marginBottom: '1rem',
              fontFamily: "'Georgia', serif",
            }}>
              Match Analysis
            </div>
            <ReactMarkdown components={markdownComponents}>{analysis}</ReactMarkdown>
          </div>
        )}

        {rewritten && (
          <div style={{
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '10px',
            padding: '2rem',
            borderLeft: '4px solid #8b5cf6',
          }}>
            <div style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8b5cf6',
              fontWeight: '600',
              marginBottom: '1rem',
              fontFamily: "'Georgia', serif",
            }}>
              Rewritten Bullets
            </div>
            <ReactMarkdown components={markdownComponents}>{rewritten}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#94a3b8',
        fontSize: '0.8rem',
        fontFamily: "'Georgia', serif",
        borderTop: '1px solid #e2e8f0',
      }}>
        Built with React, FastAPI & Claude AI
      </div>
    </div>
  )
}