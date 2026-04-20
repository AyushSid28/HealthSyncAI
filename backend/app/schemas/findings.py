from __future__ import annotations
from pydantic import BaseModel
from typing import Literal


class InterpretedFinding(BaseModel):
    parameter_name: str
    clinical_value: str
    interpretation: str
    context: str
    category: str


class RiskCard(BaseModel):
    indicator: str
    severity: Literal["low", "moderate", "high", "critical"]
    color: Literal["green", "amber", "red", "dark_red"]
    value: str
    threshold_range: str
    explanation: str
    urgency_flag: bool = False


class WellnessScore(BaseModel):
    composite_score: int
    dimensions: dict[str, int]


class Recommendation(BaseModel):
    category: str
    title: str
    description: str
    timeframe: str
    priority: Literal["essential", "recommended", "optional"]
    related_risk: str
