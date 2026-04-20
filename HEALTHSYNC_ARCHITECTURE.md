# HealthSync AI — Multi-Agent Health Report System

## Master Architecture Prompt & Implementation Blueprint

---

## 0. Project Identity

| Field | Value |
|---|---|
| **Project Name** | HealthSync AI |
| **Tagline** | "Your health, understood — not just measured." |
| **Core Value Prop** | Multi-agent AI system that converts raw clinical data into empathetic, personalized health reports with actionable recommendations |
| **Architecture Style** | Agentic pipeline (LangGraph orchestration, ReAct reasoning loop) |
| **Total Cost** | ₹0 (fully free-tier stack) |

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LAYER 1 — INPUTS                             │
│  ┌──────────────┐  ┌──────────────────┐  ┌───────────────────────┐  │
│  │ Raw Clinical │  │  User Profile    │  │ Quantitative Params   │  │
│  │ Notes (text) │  │ (name,age,gender │  │ (BP, glucose, BMI,    │  │
│  │              │  │  history)        │  │  cholesterol, etc.)   │  │
│  └──────┬───────┘  └────────┬─────────┘  └───────────┬───────────┘  │
│         └──────────────┬────┴────────────────────────┘              │
│                        ▼                                            │
│              Normalized JSON Object                                 │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   LAYER 2 — INPUT PARSER AGENT                      │
│  • Expand medical abbreviations (BP→Blood Pressure, etc.)           │
│  • Flag missing/incomplete data                                     │
│  • Produce clean, validated schema                                  │
│  • Output: StructuredHealthInput (typed JSON)                       │
└────────────────────────┬────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│               LAYER 3 — AGENTIC CORE (ORCHESTRATOR)                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              ORCHESTRATOR AGENT (ReAct Loop)                 │    │
│  │  Think → Act → Observe → Repeat                             │    │
│  │  • Creates task plan from structured input                   │    │
│  │  • Routes data to specialist agents                          │    │
│  │  • Handles retry/loop-back on unsatisfactory results         │    │
│  └──────┬──────────────────┬──────────────────┬────────────────┘    │
│         ▼                  ▼                  ▼                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐         │
│  │  MEDICAL     │  │    RISK      │  │  RECOMMENDATION   │         │
│  │  INTERPRETER │  │  STRATIFIER  │  │     ENGINE        │         │
│  │  AGENT       │  │  AGENT       │  │     AGENT         │         │
│  │              │  │              │  │                   │         │
│  │ • 8th-grade  │  │ • Low/Med/   │  │ • Personalized   │         │
│  │   reading    │  │   High risk  │  │   actionable     │         │
│  │   level      │  │ • Risk cards │  │   advice         │         │
│  │ • Empathetic │  │ • Wellness   │  │ • Time-bound     │         │
│  │   tone       │  │   Score 0-100│  │ • Age-aware      │         │
│  │ • Age-aware  │  │ • Color code │  │ • Risk-aligned   │         │
│  │   context    │  │   G/A/R      │  │                   │         │
│  └──────┬───────┘  └──────┬───────┘  └────────┬──────────┘         │
│         └──────────────────┴───────────────────┘                    │
│                            ▼                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  LAYER 4 — QA VALIDATOR AGENT                       │
│  • Factual consistency check                                        │
│  • Tone calibration (empathetic, not alarming)                      │
│  • Completeness verification (all 7 sections populated)             │
│  • Self-correction loop → sends fixes back to orchestrator          │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  LAYER 5 — REPORT COMPILER AGENT                    │
│  • Slots validated content into fixed 7-section template            │
│  • Applies formatting rules                                         │
│  • Triggers PDF generation (ReportLab)                              │
│  • Generates dashboard-ready JSON                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LAYER 6 — OUTPUTS                                │
│  ┌──────────┐   ┌──────────────────┐   ┌────────────────────┐      │
│  │  PDF      │   │  Web Dashboard   │   │  Delivery (Email/  │      │
│  │  Download │   │  + Radar Chart   │   │   WhatsApp)        │      │
│  └──────────┘   └──────────────────┘   └────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack (All Free Tier)

| Component | Technology | Cost | Purpose |
|---|---|---|---|
| AI Backbone | Claude API (`claude-sonnet-4-20250514`) | Free hackathon credits | All agent LLM calls |
| AI Fallback | Groq (Llama 3) | Free tier | Backup if Claude unavailable |
| Orchestration | LangGraph (Python) | Open source | Multi-agent loop, state machine |
| Backend | FastAPI (Python 3.11+) | Free | REST API, agent pipeline |
| Frontend | Next.js 14 (App Router) | Free (Vercel) | Dashboard, forms, charts |
| PDF Generation | ReportLab | Free | Server-side PDF rendering |
| Database | Supabase (Postgres) | Free (500MB) | Users, reports, history |
| Auth | Supabase Auth | Free | User + Doctor auth |
| Charts | Chart.js / Recharts | Free | Radar chart, trends |
| Email | Gmail SMTP | Free | Report delivery |
| WhatsApp | Twilio Sandbox | Free (dev) | Report delivery |
| Hosting (BE) | Railway / Render | Free tier | Backend deployment |
| Hosting (FE) | Vercel | Free tier | Frontend deployment |
| Voice Input | Web Speech API | Browser-native | Dictation input |

---

## 3. Directory Structure

```
healthsync-ai/
├── backend/                          # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI app entry, CORS, lifespan
│   │   ├── config.py                 # Environment vars, API keys, settings
│   │   │
│   │   ├── api/                      # Route handlers
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── health.py         # Health check endpoint
│   │   │   │   ├── assessment.py     # POST /assess — main pipeline trigger
│   │   │   │   ├── reports.py        # GET/list reports, download PDF
│   │   │   │   ├── dashboard.py      # GET dashboard data (JSON for frontend)
│   │   │   │   ├── doctor.py         # Doctor portal endpoints
│   │   │   │   └── auth.py           # Auth endpoints (proxy to Supabase)
│   │   │   └── deps.py              # Shared dependencies (DB session, auth)
│   │   │
│   │   ├── agents/                   # All LangGraph agents
│   │   │   ├── __init__.py
│   │   │   ├── graph.py              # LangGraph state graph definition
│   │   │   ├── state.py              # Shared AgentState TypedDict
│   │   │   ├── orchestrator.py       # Orchestrator agent (ReAct loop)
│   │   │   ├── input_parser.py       # Input Parser agent
│   │   │   ├── medical_interpreter.py # Medical Interpreter agent
│   │   │   ├── risk_stratifier.py    # Risk Stratifier agent
│   │   │   ├── recommendation.py     # Recommendation Engine agent
│   │   │   ├── qa_validator.py       # QA Validator agent
│   │   │   └── report_compiler.py    # Report Compiler agent
│   │   │
│   │   ├── prompts/                  # All system prompts (separated for clarity)
│   │   │   ├── __init__.py
│   │   │   ├── input_parser.py       # Input parser system prompt
│   │   │   ├── orchestrator.py       # Orchestrator system prompt
│   │   │   ├── medical_interpreter.py
│   │   │   ├── risk_stratifier.py
│   │   │   ├── recommendation.py
│   │   │   ├── qa_validator.py
│   │   │   └── report_compiler.py
│   │   │
│   │   ├── schemas/                  # Pydantic models (request/response + internal)
│   │   │   ├── __init__.py
│   │   │   ├── input.py              # RawInput, UserProfile, QuantitativeParams
│   │   │   ├── parsed.py             # StructuredHealthInput (post-parser)
│   │   │   ├── findings.py           # InterpretedFinding, RiskCard, Recommendation
│   │   │   ├── report.py             # FullReport, ReportSection models
│   │   │   └── wellness.py           # WellnessScore, RadarDimension models
│   │   │
│   │   ├── services/                 # Business logic (non-agent)
│   │   │   ├── __init__.py
│   │   │   ├── pdf_generator.py      # ReportLab PDF rendering
│   │   │   ├── email_service.py      # Gmail SMTP delivery
│   │   │   ├── whatsapp_service.py   # Twilio WhatsApp delivery
│   │   │   ├── supabase_client.py    # Supabase DB/auth client
│   │   │   └── longitudinal.py       # Historical comparison logic
│   │   │
│   │   ├── templates/                # PDF/report templates
│   │   │   ├── report_template.py    # ReportLab layout definition
│   │   │   └── styles.py             # Colors, fonts, spacing constants
│   │   │
│   │   └── utils/                    # Shared utilities
│   │       ├── __init__.py
│   │       ├── medical_abbreviations.py  # Abbreviation → expansion map
│   │       ├── risk_thresholds.py    # Evidence-based thresholds
│   │       └── language.py           # Multi-language support helpers
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_agents/
│   │   ├── test_api/
│   │   └── test_services/
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                         # Next.js 14 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Root layout (fonts, metadata)
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── globals.css           # Global styles (Tailwind)
│   │   │   │
│   │   │   ├── assess/
│   │   │   │   └── page.tsx          # Assessment input form
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Main health dashboard
│   │   │   │   └── [reportId]/
│   │   │   │       └── page.tsx      # Individual report view
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   └── page.tsx          # Report history list
│   │   │   │
│   │   │   ├── doctor/
│   │   │   │   ├── page.tsx          # Doctor portal dashboard
│   │   │   │   └── patients/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx  # Patient detail view
│   │   │   │
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   └── page.tsx
│   │   │       └── register/
│   │   │           └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                   # Reusable UI primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── Modal.tsx
│   │   │   │
│   │   │   ├── assessment/           # Assessment form components
│   │   │   │   ├── ClinicalNotesInput.tsx    # Textarea + voice input
│   │   │   │   ├── ProfileForm.tsx           # Name, age, gender, history
│   │   │   │   ├── ParametersForm.tsx        # BP, glucose, BMI fields
│   │   │   │   └── VoiceInput.tsx            # Web Speech API mic button
│   │   │   │
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   │   ├── WellnessScoreCard.tsx     # Big headline number
│   │   │   │   ├── RadarChart.tsx            # 6-dimension hexagonal chart
│   │   │   │   ├── RiskCard.tsx              # Individual risk indicator
│   │   │   │   ├── RiskCardGrid.tsx          # Grid of all risk cards
│   │   │   │   ├── FindingsSection.tsx       # Interpreted findings display
│   │   │   │   ├── RecommendationsList.tsx   # Actionable recommendations
│   │   │   │   ├── TrendChart.tsx            # Longitudinal comparison
│   │   │   │   └── UrgencyBanner.tsx         # Red critical alert banner
│   │   │   │
│   │   │   ├── report/               # Report-specific components
│   │   │   │   ├── ReportViewer.tsx          # Full 7-section report view
│   │   │   │   └── DownloadButton.tsx        # PDF download trigger
│   │   │   │
│   │   │   └── layout/               # Layout components
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── LanguageToggle.tsx        # Multi-language selector
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts                # Backend API client (fetch wrapper)
│   │   │   ├── supabase.ts           # Supabase client (browser)
│   │   │   └── utils.ts              # Shared utility functions
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAssessment.ts      # Assessment submission hook
│   │   │   ├── useDashboard.ts       # Dashboard data fetching
│   │   │   ├── useVoiceInput.ts      # Web Speech API hook
│   │   │   └── useAuth.ts            # Auth state management
│   │   │
│   │   └── types/
│   │       └── index.ts              # Shared TypeScript types
│   │
│   ├── public/
│   │   └── logo.svg
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local.example
│
├── .gitignore
├── docker-compose.yml                # Local dev (backend + DB)
├── README.md
└── HEALTHSYNC_ARCHITECTURE.md        # This file
```

---

## 4. Data Flow & Schemas

### 4.1 Input Schema (Layer 1)

```python
# backend/app/schemas/input.py

class ClinicalNotes(BaseModel):
    raw_text: str                          # Free-form clinical notes
    source: Literal["manual", "voice", "doctor_upload"] = "manual"

class UserProfile(BaseModel):
    name: str
    age: int                               # Years
    gender: Literal["male", "female", "other"]
    medical_history: list[str] = []        # e.g., ["diabetes", "hypertension"]
    current_medications: list[str] = []
    allergies: list[str] = []
    lifestyle: LifestyleParams | None = None

class LifestyleParams(BaseModel):
    smoking: bool = False
    alcohol_frequency: Literal["none", "occasional", "moderate", "heavy"] = "none"
    exercise_frequency: Literal["sedentary", "light", "moderate", "active"] = "sedentary"
    diet_type: Literal["vegetarian", "non_vegetarian", "vegan", "other"] = "other"
    sleep_hours: float | None = None

class QuantitativeParams(BaseModel):
    blood_pressure_systolic: float | None = None    # mmHg
    blood_pressure_diastolic: float | None = None   # mmHg
    heart_rate: float | None = None                 # bpm
    blood_glucose_fasting: float | None = None      # mg/dL
    blood_glucose_pp: float | None = None           # mg/dL (post-prandial)
    hba1c: float | None = None                      # %
    total_cholesterol: float | None = None           # mg/dL
    hdl_cholesterol: float | None = None             # mg/dL
    ldl_cholesterol: float | None = None             # mg/dL
    triglycerides: float | None = None               # mg/dL
    bmi: float | None = None                         # kg/m²
    hemoglobin: float | None = None                  # g/dL
    creatinine: float | None = None                  # mg/dL
    tsh: float | None = None                         # mIU/L
    vitamin_d: float | None = None                   # ng/mL
    vitamin_b12: float | None = None                 # pg/mL
    # Extensible: add more as needed

class AssessmentRequest(BaseModel):
    clinical_notes: ClinicalNotes | None = None
    profile: UserProfile
    parameters: QuantitativeParams | None = None
    language: Literal["en", "hi", "mr"] = "en"       # Output language
```

### 4.2 Parsed Schema (Layer 2 Output)

```python
# backend/app/schemas/parsed.py

class ParsedParameter(BaseModel):
    name: str                              # e.g., "Blood Pressure (Systolic)"
    value: float
    unit: str                              # e.g., "mmHg"
    category: Literal["cardiovascular", "metabolic", "hematological",
                       "renal", "thyroid", "nutritional", "physical"]

class ParsedClinicalNote(BaseModel):
    original_text: str
    expanded_text: str                     # Abbreviations expanded
    extracted_conditions: list[str]        # Detected conditions/symptoms
    extracted_medications: list[str]       # Detected medications

class StructuredHealthInput(BaseModel):
    profile: UserProfile
    parameters: list[ParsedParameter]
    clinical_notes: ParsedClinicalNote | None
    missing_data_flags: list[str]          # e.g., ["cholesterol values missing"]
    data_completeness_score: float         # 0.0–1.0
    language: str
```

### 4.3 Agent Output Schemas (Layer 3)

```python
# backend/app/schemas/findings.py

class InterpretedFinding(BaseModel):
    parameter_name: str
    clinical_value: str                    # "140/90 mmHg"
    interpretation: str                    # Plain English, empathetic
    context: str                           # Age/profile-specific context
    category: str

class RiskCard(BaseModel):
    indicator: str                         # "Blood Pressure"
    severity: Literal["low", "moderate", "high", "critical"]
    color: Literal["green", "amber", "red", "dark_red"]
    value: str                             # "140/90 mmHg"
    threshold_range: str                   # "Normal: <120/80"
    explanation: str                       # Why this is flagged
    urgency_flag: bool = False             # True if needs immediate attention

class WellnessScore(BaseModel):
    composite_score: int                   # 0–100
    dimensions: dict[str, int]             # 6 radar dimensions, each 0–100
    # Keys: physical, metabolic, cardiovascular, mental, nutritional, lifestyle

class Recommendation(BaseModel):
    category: str                          # "Diet", "Exercise", "Medical", etc.
    title: str                             # Short actionable title
    description: str                       # Detailed personalized advice
    timeframe: str                         # "Daily", "Within 2 weeks", etc.
    priority: Literal["essential", "recommended", "optional"]
    related_risk: str                      # Which risk card this addresses
```

### 4.4 Report Schema (Layer 5 Output)

```python
# backend/app/schemas/report.py

class ReportSection(BaseModel):
    title: str
    content: str | list | dict             # Flexible per section type

class FullReport(BaseModel):
    report_id: str                         # UUID
    generated_at: datetime
    language: str

    # The 7 mandatory sections
    profile_summary: ReportSection
    key_observations: ReportSection        # High-level summary (3–5 bullets)
    interpreted_findings: list[InterpretedFinding]
    risk_indicators: list[RiskCard]
    wellness_insights: ReportSection       # Wellness Score + radar data
    personalized_recommendations: list[Recommendation]
    preventive_lifestyle: ReportSection    # Lifestyle suggestions

    # Metadata
    wellness_score: WellnessScore
    urgency_alerts: list[str]              # Critical findings requiring attention
    data_completeness: float
    longitudinal_comparison: dict | None   # "What's changed" (if prior report)

    # QA metadata
    qa_passed: bool
    qa_notes: list[str]
```

---

## 5. Agent Specifications

### 5.1 Input Parser Agent

**Role:** Structure and clean raw input before any AI processing.

**System Prompt Core Directives:**
- Expand ALL medical abbreviations (maintain internal dictionary + LLM fallback)
- Validate numeric ranges (flag obviously impossible values like BP 500/300)
- Identify and extract conditions, symptoms, medications from clinical notes
- Produce `missing_data_flags` for any important absent parameters
- Calculate `data_completeness_score`
- NEVER interpret or diagnose — only structure

**Input:** `AssessmentRequest`
**Output:** `StructuredHealthInput`

### 5.2 Orchestrator Agent

**Role:** Project manager of the agent pipeline. Uses ReAct reasoning.

**System Prompt Core Directives:**
- Read `StructuredHealthInput`, create a task plan
- Route to specialist agents (parallel where possible)
- Collect results, check for completeness
- If any agent output is unsatisfactory (incomplete, inconsistent), loop back with specific correction instructions
- Maximum 2 retry loops before proceeding with best available output
- Log all reasoning steps for transparency

**Reasoning Pattern:**
```
THINK: What does this input require? Which agents need what data?
ACT:   Route parsed input to Medical Interpreter, Risk Stratifier, Recommendation Engine
OBSERVE: Collect outputs. Check: Are all sections populated? Any contradictions?
REPEAT: If QA fails, send correction request. Otherwise, forward to Report Compiler.
```

**Input:** `StructuredHealthInput`
**Output:** Aggregated results from all specialist agents → forwarded to QA Validator

### 5.3 Medical Interpreter Agent

**Role:** Convert clinical findings into empathetic, plain-English explanations.

**System Prompt Core Directives:**
- Reading level: 8th grade (Flesch-Kincaid ~60–70)
- NEVER use medical jargon without immediately explaining it
- Replace: "hypertension" → "your blood pressure is higher than the healthy range"
- Replace: "hyperglycemia" → "your blood sugar level is elevated"
- ALWAYS contextualize against age and profile:
  - A 60-year-old with slightly elevated cholesterol gets a different interpretation than a 25-year-old
  - Factor in medical history (diabetic patient's glucose interpretation differs)
- Tone: warm, supportive, never alarming. Use "you" not "the patient"
- For each finding: state what was measured, what it means, and why it matters for THIS person
- If data is missing, say so honestly: "We didn't have your cholesterol numbers, so we couldn't assess this area"

**Input:** `StructuredHealthInput`
**Output:** `list[InterpretedFinding]`

### 5.4 Risk Stratifier Agent

**Role:** Categorize findings by risk level using evidence-based thresholds.

**System Prompt Core Directives:**
- Use WHO/AHA/ADA/ICMR clinical thresholds (hardcoded reference table provided)
- For each parameter, determine: LOW (within normal), MODERATE (borderline/pre-condition), HIGH (outside safe range), CRITICAL (immediate danger)
- Output structured `RiskCard` for each assessed parameter
- Color coding: GREEN (low), AMBER (moderate), RED (high), DARK_RED (critical)
- Compute composite `WellnessScore` (0–100):
  - Six dimensions: Physical, Metabolic, Cardiovascular, Mental, Nutritional, Lifestyle
  - Each dimension scored 0–100 based on relevant parameters
  - Composite = weighted average (weights configurable)
- **URGENCY FLAG**: If ANY parameter hits critical threshold (e.g., glucose >400 mg/dL, BP >180/120), set `urgency_flag: true` and generate urgency alert text

**Evidence-Based Thresholds (Hardcoded Reference):**
```
Blood Pressure (mmHg):
  Normal:    <120 / <80
  Elevated:  120-129 / <80
  High S1:   130-139 / 80-89
  High S2:   ≥140 / ≥90
  Crisis:    >180 / >120

Fasting Glucose (mg/dL):
  Normal:    70–99
  Pre-diabetic: 100–125
  Diabetic:  ≥126
  Critical:  >400 or <54

HbA1c (%):
  Normal:    <5.7
  Pre-diabetic: 5.7–6.4
  Diabetic:  ≥6.5

BMI (kg/m²):
  Underweight: <18.5
  Normal:      18.5–24.9
  Overweight:  25–29.9
  Obese:       ≥30

Total Cholesterol (mg/dL):
  Desirable:   <200
  Borderline:  200–239
  High:        ≥240

... (complete table in risk_thresholds.py)
```

**Input:** `StructuredHealthInput`
**Output:** `list[RiskCard]` + `WellnessScore`

### 5.5 Recommendation Engine Agent

**Role:** Generate personalized, actionable health recommendations.

**System Prompt Core Directives:**
- Input: interpreted findings + risk cards + user profile
- NEVER give generic advice. Every recommendation must reference the user's specific situation
- BAD: "Exercise more"
- GOOD: "Based on your BMI of 28.4 and sedentary lifestyle, aim for 30 minutes of brisk walking 5 days a week for the next 4 weeks. This can help reduce your BMI by 1–2 points."
- Each recommendation must have:
  - A specific timeframe ("within 2 weeks", "daily", "at your next checkup")
  - A priority level (essential/recommended/optional)
  - A link to which risk indicator it addresses
- Consider age, existing conditions, medications, allergies when recommending
- Include both medical follow-ups ("consult an endocrinologist within 30 days") and lifestyle changes
- Separate into categories: Diet, Exercise, Medical Follow-up, Mental Health, Supplements, Screening

**Input:** `list[InterpretedFinding]` + `list[RiskCard]` + `UserProfile`
**Output:** `list[Recommendation]`

### 5.6 QA Validator Agent

**Role:** Quality gate before report compilation.

**Three Validation Checks:**

1. **Factual Consistency**
   - Does every recommendation align with its corresponding risk level?
   - Are there contradictions? (e.g., "low risk for diabetes" but recommending "urgent glucose management")
   - Do numerical values in interpretations match the input data?

2. **Tone Calibration**
   - Is the language empathetic and supportive?
   - Are critical findings communicated clearly but without panic-inducing language?
   - Is the reading level appropriate (no unexplained jargon)?

3. **Completeness**
   - Are all 7 report sections populated?
   - Are there at least 3 recommendations?
   - Is the wellness score computed?
   - Are missing data flags properly communicated?

**Output:**
```python
class QAResult(BaseModel):
    passed: bool
    issues: list[QAIssue]              # What failed
    corrections: list[CorrectionRequest]  # Structured fix instructions

class QAIssue(BaseModel):
    check_type: Literal["consistency", "tone", "completeness"]
    description: str
    severity: Literal["blocker", "warning"]
    affected_section: str

class CorrectionRequest(BaseModel):
    target_agent: str                  # Which agent needs to re-run
    instruction: str                   # What to fix
    original_output: str               # What was wrong
```

If `passed == False` with blockers → loop back through orchestrator (max 2 retries).

### 5.7 Report Compiler Agent

**Role:** Assemble final report from validated outputs.

**Seven Sections (Fixed Template):**

| # | Section | Source |
|---|---|---|
| 1 | Profile Summary | UserProfile (formatted) |
| 2 | Key Observations | Orchestrator summary (3–5 bullets) |
| 3 | Interpreted Findings | Medical Interpreter output |
| 4 | Risk Indicators | Risk Stratifier output (cards + urgency) |
| 5 | Wellness Insights | Wellness Score + radar dimensions |
| 6 | Personalized Recommendations | Recommendation Engine output |
| 7 | Preventive Lifestyle Suggestions | Recommendation Engine (lifestyle subset) |

**Additional elements:**
- Urgency banner (if any critical findings)
- Data completeness note
- Longitudinal comparison section (if prior report exists)
- Disclaimer: "This report is AI-generated and not a substitute for professional medical advice."

---

## 6. LangGraph State Machine

```python
# backend/app/agents/state.py

from typing import TypedDict, Annotated
from langgraph.graph import add_messages

class AgentState(TypedDict):
    # Input
    raw_input: dict                        # Original AssessmentRequest
    
    # Layer 2 output
    structured_input: dict | None          # StructuredHealthInput
    
    # Layer 3 outputs
    interpreted_findings: list | None
    risk_cards: list | None
    wellness_score: dict | None
    recommendations: list | None
    
    # Layer 4
    qa_result: dict | None
    retry_count: int
    
    # Layer 5
    final_report: dict | None
    pdf_path: str | None
    
    # Metadata
    messages: Annotated[list, add_messages]
    current_agent: str
    errors: list
```

```python
# backend/app/agents/graph.py — LangGraph flow

from langgraph.graph import StateGraph, END

workflow = StateGraph(AgentState)

# Add nodes (one per agent)
workflow.add_node("input_parser", input_parser_node)
workflow.add_node("orchestrator", orchestrator_node)
workflow.add_node("medical_interpreter", medical_interpreter_node)
workflow.add_node("risk_stratifier", risk_stratifier_node)
workflow.add_node("recommendation_engine", recommendation_engine_node)
workflow.add_node("qa_validator", qa_validator_node)
workflow.add_node("report_compiler", report_compiler_node)

# Define edges
workflow.set_entry_point("input_parser")
workflow.add_edge("input_parser", "orchestrator")

# Orchestrator fans out to specialist agents (parallel)
workflow.add_edge("orchestrator", "medical_interpreter")
workflow.add_edge("orchestrator", "risk_stratifier")

# Recommendation engine depends on interpreter + stratifier
workflow.add_edge("medical_interpreter", "recommendation_engine")
workflow.add_edge("risk_stratifier", "recommendation_engine")

# QA validates combined output
workflow.add_edge("recommendation_engine", "qa_validator")

# Conditional: QA pass → compile, QA fail → back to orchestrator
workflow.add_conditional_edges(
    "qa_validator",
    lambda state: "report_compiler" if state["qa_result"]["passed"] 
                  or state["retry_count"] >= 2 
                  else "orchestrator"
)

workflow.add_edge("report_compiler", END)

app = workflow.compile()
```

---

## 7. API Endpoints

```
POST   /api/v1/assess              # Submit assessment → triggers full pipeline
GET    /api/v1/assess/{id}/status   # Poll pipeline status (SSE or polling)
GET    /api/v1/reports              # List user's reports
GET    /api/v1/reports/{id}         # Get full report JSON
GET    /api/v1/reports/{id}/pdf     # Download PDF
GET    /api/v1/dashboard/{id}       # Dashboard-optimized JSON (charts, scores)
POST   /api/v1/reports/{id}/deliver # Send via email/WhatsApp
GET    /api/v1/longitudinal         # Compare reports over time

# Doctor portal
POST   /api/v1/doctor/upload        # Doctor uploads patient findings
GET    /api/v1/doctor/patients      # List doctor's patients
GET    /api/v1/doctor/patients/{id} # Patient detail + report history

# Auth
POST   /api/v1/auth/register        # Register (user or doctor)
POST   /api/v1/auth/login           # Login
POST   /api/v1/auth/logout          # Logout
```

---

## 8. Frontend Pages & Components

### 8.1 Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero, features, CTA → "Get Your Health Report" |
| `/assess` | Assessment Form | 3-section form (notes + profile + parameters) with voice input |
| `/dashboard` | Dashboard | Wellness Score headline, radar chart, risk cards, recommendations |
| `/dashboard/[id]` | Report Detail | Full 7-section report view + PDF download |
| `/reports` | History | List of past reports with trend indicators |
| `/doctor` | Doctor Portal | Patient list, upload form, multi-patient view |
| `/auth/login` | Login | Email/password login |
| `/auth/register` | Register | User or Doctor registration |

### 8.2 Key UI Patterns

- **Wellness Score Card:** Large circular progress indicator (0–100) with color gradient (red→amber→green). Centered at top of dashboard.
- **Radar Chart:** Hexagonal Chart.js radar with 6 axes. Overlaid with previous assessment if longitudinal data exists.
- **Risk Cards:** Grid of cards, each with colored left border (green/amber/red), parameter name, value, and one-line explanation.
- **Urgency Banner:** Full-width red banner at top of report: "⚠ This finding requires prompt medical attention. Please consult a doctor within 24–48 hours."
- **Language Toggle:** Dropdown in navbar (English / Hindi / Marathi). Triggers re-render with translated content.
- **Voice Input:** Microphone button on clinical notes textarea. Animated pulse when recording.

### 8.3 Design System

- **Colors:** 
  - Primary: `#2563EB` (blue-600)
  - Success/Low Risk: `#16A34A` (green-600)
  - Warning/Moderate: `#F59E0B` (amber-500)
  - Danger/High Risk: `#DC2626` (red-600)
  - Critical: `#7F1D1D` (red-900)
  - Background: `#F8FAFC` (slate-50)
  - Card: `#FFFFFF`
- **Typography:** Inter font, system fallback
- **Spacing:** 4px base unit, Tailwind defaults
- **Border Radius:** `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons
- **Shadows:** `shadow-sm` for cards, `shadow-md` on hover

---

## 9. Enhancement Specifications

### 9.1 Urgency Flagging
- Triggered when Risk Stratifier detects `severity: "critical"`
- Inserts red banner in both PDF and web dashboard
- Banner text: "This finding requires prompt medical attention. Please consult a doctor within 24–48 hours."
- Lists the specific critical finding(s)

### 9.2 Wellness Score Radar Chart
- 6 dimensions: Physical, Metabolic, Cardiovascular, Mental, Nutritional, Lifestyle
- Each scored 0–100 independently
- Rendered as hexagonal radar (Chart.js `type: 'radar'`)
- If longitudinal data exists, overlay previous assessment in lighter color

### 9.3 Multi-Language Output
- Supported: English (`en`), Hindi (`hi`), Marathi (`mr`)
- Language parameter passed in AssessmentRequest
- All agent prompts include language instruction: "Generate your output in {language}"
- UI strings stored in `/frontend/src/lib/i18n/` with JSON translation files
- Language toggle in navbar switches frontend + re-fetches report in new language

### 9.4 Longitudinal Tracking
- On new assessment, backend checks for prior reports for same user
- If exists, `longitudinal.py` computes:
  - Parameter-level deltas (e.g., "BMI: 28.4 → 27.1, improved by 1.3")
  - Wellness Score trend (e.g., "72 → 78, +6 points")
  - Risk level changes (e.g., "Blood Pressure: HIGH → MODERATE")
- Generates "What's Changed" section in report
- Frontend shows trend arrows (↑↓→) and mini sparkline charts

### 9.5 Doctor Portal
- Separate auth role: `doctor`
- Doctors can:
  - Upload clinical findings for a patient (creates assessment)
  - View all their patients' reports
  - See longitudinal trends across patients
- Patients linked to doctors via `doctor_id` in Supabase

### 9.6 Voice Input
- Browser-native Web Speech API (`webkitSpeechRecognition`)
- Microphone button on clinical notes textarea
- Real-time transcription displayed as user speaks
- "Stop" button finalizes and inserts text
- Works offline (browser-side, zero backend cost)

---

## 10. Database Schema (Supabase/Postgres)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor')),
    age INT,
    gender TEXT,
    medical_history JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments (one per submission)
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    doctor_id UUID REFERENCES profiles(id),  -- NULL if self-submitted
    raw_input JSONB NOT NULL,                 -- Original AssessmentRequest
    structured_input JSONB,                   -- Post-parser output
    status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports (one per completed assessment)
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES assessments(id) UNIQUE,
    user_id UUID REFERENCES profiles(id),
    report_data JSONB NOT NULL,               -- Full FullReport JSON
    wellness_score INT,                       -- Denormalized for quick queries
    language TEXT DEFAULT 'en',
    pdf_url TEXT,                             -- Supabase storage URL
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctor-Patient relationship
CREATE TABLE doctor_patients (
    doctor_id UUID REFERENCES profiles(id),
    patient_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (doctor_id, patient_id)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
```

---

## 11. Implementation Phases

### Phase 1 — Core Pipeline (Day 1–2)
- [ ] Project scaffolding (backend + frontend)
- [ ] Pydantic schemas (input, parsed, findings, report)
- [ ] Input Parser Agent (abbreviation expansion, validation)
- [ ] Medical Interpreter Agent (plain-English conversion)
- [ ] Orchestrator Agent (basic routing, no retry loop yet)
- [ ] Report Compiler Agent (7-section template)
- [ ] PDF generation (ReportLab)
- [ ] Basic FastAPI endpoints (POST /assess, GET /reports/{id}/pdf)
- [ ] Basic Next.js form (assessment input)
- **Milestone:** Submit clinical data → get a PDF report

### Phase 2 — Full Agent Pipeline (Day 2–3)
- [ ] Risk Stratifier Agent (thresholds, risk cards, wellness score)
- [ ] Recommendation Engine Agent (personalized, time-bound)
- [ ] QA Validator Agent (consistency, tone, completeness checks)
- [ ] Orchestrator retry loop (ReAct pattern)
- [ ] LangGraph state machine wiring (parallel execution)
- [ ] Supabase integration (auth, storage, DB)
- **Milestone:** Full agent pipeline with quality validation

### Phase 3 — Dashboard & Differentiation (Day 3–4)
- [ ] Web dashboard (Wellness Score card, risk card grid)
- [ ] Radar chart (Chart.js, 6 dimensions)
- [ ] Urgency flagging (red banner for critical findings)
- [ ] Multi-language support (Hindi, Marathi)
- [ ] Email delivery (Gmail SMTP)
- [ ] Assessment form polish (multi-step, validation)
- **Milestone:** Beautiful dashboard with differentiated features

### Phase 4 — Polish & Extras (Day 4+)
- [ ] Doctor portal (upload, patient list, multi-patient view)
- [ ] Voice input (Web Speech API)
- [ ] Longitudinal tracking (report comparison, trends)
- [ ] WhatsApp delivery (Twilio sandbox)
- [ ] Loading states, error handling, edge cases
- [ ] Mobile responsiveness
- [ ] Demo data / sample reports for presentation
- **Milestone:** Competition-ready product

---

## 12. Key Design Decisions & Rationale

| Decision | Rationale |
|---|---|
| Separate prompts per agent (not one mega-prompt) | Each agent has a focused role → less hallucination, easier debugging, parallel execution |
| Hardcoded thresholds (not LLM-generated) | Medical thresholds must be deterministic and evidence-based, never hallucinated |
| QA validation loop | Self-correction is the single most impactful quality mechanism; catches 80%+ of issues |
| Pydantic schemas for all data | Type safety prevents malformed data from propagating through the pipeline |
| Language as a parameter, not a separate pipeline | Same agents, same logic — just a different output instruction. Simpler, cheaper |
| ReportLab over browser PDF | Server-side generation is more reliable and doesn't depend on browser rendering |
| Supabase over raw Postgres | Auth, storage, RLS, and SDK all bundled — massive time savings |
| LangGraph over raw async | Built-in state management, retry, conditional edges — no need to reinvent |

---

## 13. Security & Compliance Notes

- All health data encrypted at rest (Supabase default)
- No PHI (Protected Health Information) logged to console in production
- API keys stored in environment variables, never in code
- CORS restricted to frontend domain in production
- Rate limiting on assessment endpoint (prevent abuse)
- Clear disclaimer: "AI-generated, not medical advice" on every output
- User data deletable on request (GDPR-style, even if not required)

---

## 14. Non-Negotiable Constraints

1. **Every report MUST have all 7 sections** — no partial reports
2. **Medical thresholds are NEVER hallucinated** — always from hardcoded reference
3. **Tone is ALWAYS empathetic** — never clinical, never alarming
4. **Reading level: 8th grade** — no unexplained jargon
5. **Urgency flags are NEVER missed** — critical findings always surfaced
6. **The system works with partial input** — missing data is flagged, not failed
7. **Disclaimer appears on EVERY output** — PDF, web, email, WhatsApp

---

*This document is the single source of truth for the HealthSync AI architecture. Every implementation decision should trace back to a section in this document.*
