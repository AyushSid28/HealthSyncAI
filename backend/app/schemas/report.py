from __future__ import annotations
from pydantic import BaseModel, Field
from typing import Literal, Any
from datetime import datetime
import uuid

from .findings import InterpretedFinding, RiskCard, WellnessScore, Recommendation


class ReportSection(BaseModel):
    title: str
    content: Any


class QAIssue(BaseModel):
    check_type: Literal["consistency", "tone", "completeness"]
    description: str
    severity: Literal["blocker", "warning"]
    affected_section: str


class CorrectionRequest(BaseModel):
    target_agent: str
    instruction: str
    original_output: str = ""


class QAResult(BaseModel):
    passed: bool
    issues: list[QAIssue] = []
    corrections: list[CorrectionRequest] = []


class FullReport(BaseModel):
    report_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    language: str = "en"

    profile_summary: ReportSection
    key_observations: ReportSection
    interpreted_findings: list[InterpretedFinding]
    risk_indicators: list[RiskCard]
    wellness_insights: ReportSection
    personalized_recommendations: list[Recommendation]
    preventive_lifestyle: ReportSection

    wellness_score: WellnessScore
    urgency_alerts: list[str] = []
    data_completeness: float = 0.0
    longitudinal_comparison: dict | None = None

    qa_passed: bool = True
    qa_notes: list[str] = []
    disclaimer: str = (
        "This report is AI-generated and not a substitute for professional medical advice. "
        "Always consult a qualified healthcare provider for diagnosis and treatment."
    )
