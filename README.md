# HealthSync AI

**Multi-agent AI system that converts raw clinical data into empathetic, personalized health reports.**

## Quick Start

### Backend (FastAPI + LangGraph)

```bash
cd backend
python -m venv venv
source venv/bin/activate       # macOS/Linux
pip install -r requirements.txt
cp .env.example .env           # Add your ANTHROPIC_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

See [HEALTHSYNC_ARCHITECTURE.md](../HEALTHSYNC_ARCHITECTURE.md) for the full system design.

**6-Layer Pipeline:**
1. **Inputs** — Clinical notes + User profile + Lab parameters
2. **Input Parser Agent** — Structures and validates raw data
3. **Agentic Core** — Orchestrator + Medical Interpreter + Risk Stratifier + Recommendation Engine
4. **QA Validator** — Self-correction loop for quality assurance
5. **Report Compiler** — Assembles 7-section health report
6. **Outputs** — PDF download + Web dashboard + Email/WhatsApp delivery

## Tech Stack

| Component | Technology |
|-----------|-----------|
| AI | Claude API (Anthropic) |
| Orchestration | LangGraph |
| Backend | FastAPI (Python) |
| Frontend | Next.js 14 + Tailwind CSS |
| PDF | ReportLab |
| Database | Supabase (Postgres) |
| Charts | Chart.js |

## API

- `POST /api/v1/assess/sync` — Submit assessment (synchronous)
- `GET /api/v1/reports/{id}` — Get report JSON
- `GET /api/v1/reports/{id}/pdf` — Download PDF
- `GET /api/v1/health` — Health check

## License

MIT
