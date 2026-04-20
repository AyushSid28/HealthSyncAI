# HealthSync AI — Architecture Flow

```mermaid
flowchart TD
    subgraph INPUT["Layer 1 — User Input"]
        A1[Web Form<br/>Name, Age, Gender, History]
        A2[Clinical Notes<br/>Type / Paste / Voice]
        A3[Document Upload<br/>PDF / Image / Text]
        A4[Lab Parameters<br/>BP, Glucose, BMI, etc.]
    end

    A1 & A2 & A4 -->|Form Submit| API
    A3 -->|File Upload| API

    API[FastAPI Backend<br/>POST /assess/sync · /assess/upload]

    API --> ROUTER{Document<br/>uploaded?}

    ROUTER -->|Yes| DOC[🔵 Document Ingestion Agent<br/>Extracts values, meds, diagnoses<br/>from uploaded file via LLM]
    ROUTER -->|No| PARSE

    DOC --> PARSE[🟢 Input Parser Agent<br/>Expands abbreviations · Validates ranges<br/>Flags missing data · Structures JSON]

    PARSE --> INTERP[🟡 Medical Interpreter Agent<br/>Plain-English explanations<br/>8th-grade reading level · Age-aware]

    INTERP --> RISK[🟠 Risk Stratifier Agent<br/>Hardcoded WHO/AHA/ADA thresholds<br/>Risk cards · Wellness Score 0-100<br/>Urgency flags for critical values]

    RISK --> REC[🔴 Recommendation Engine Agent<br/>Personalized, time-bound advice<br/>Considers meds, allergies, age]

    REC --> COMPILE[📋 Report Compiler<br/>Assembles 7-section report<br/>No LLM call — deterministic]

    subgraph OUTPUT["Layer 6 — Outputs"]
        O1[Web Dashboard<br/>Score · Radar Chart · Risk Cards]
        O2[PDF Download<br/>ReportLab · 7 sections]
        O3[Email / WhatsApp<br/>Gmail SMTP · Twilio]
    end

    COMPILE --> O1
    COMPILE --> O2
    COMPILE --> O3

    subgraph TECH["Tech Stack"]
        direction LR
        T1[Groq API<br/>Llama 4 Scout 17B]
        T2[LangGraph<br/>Orchestration]
        T3[FastAPI<br/>Backend]
        T4[Next.js 14<br/>Frontend]
        T5[ReportLab<br/>PDF Gen]
        T6[Supabase<br/>DB + Auth]
    end

    style INPUT fill:#EFF6FF,stroke:#2563EB,color:#1E293B
    style OUTPUT fill:#F0FDF4,stroke:#16A34A,color:#1E293B
    style TECH fill:#F8FAFC,stroke:#94A3B8,color:#1E293B
    style DOC fill:#DBEAFE,stroke:#2563EB,color:#1E293B
    style PARSE fill:#D1FAE5,stroke:#16A34A,color:#1E293B
    style INTERP fill:#FEF9C3,stroke:#F59E0B,color:#1E293B
    style RISK fill:#FFEDD5,stroke:#F97316,color:#1E293B
    style REC fill:#FEE2E2,stroke:#DC2626,color:#1E293B
    style COMPILE fill:#F1F5F9,stroke:#64748B,color:#1E293B
    style ROUTER fill:#F5F3FF,stroke:#7C3AED,color:#1E293B
```

## Pipeline Summary

```
User ──► Form / Upload ──► FastAPI ──► [Doc Ingestion?] ──► Input Parser ──► Medical Interpreter ──► Risk Stratifier ──► Recommendations ──► Report Compiler ──► Dashboard + PDF
              │                              │                   │                  │                      │                    │                       │
              │                         Extract text         Structure          Plain English         Risk Cards            Actionable            7-section
              │                         from PDF/img         & validate         explanations          + Score 0-100         advice                assembly
              ▼                                                                                                                                    │
         Groq LLM ◄──────── All agents call Llama 4 Scout 17B via Groq API (free tier) ──────────────────────────────────────────────────────────────┘
```
