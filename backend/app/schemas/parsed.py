from __future__ import annotations
from pydantic import BaseModel
from typing import Literal
from .input import UserProfile


class ParsedParameter(BaseModel):
    name: str
    value: float
    unit: str
    category: Literal[
        "cardiovascular",
        "metabolic",
        "hematological",
        "renal",
        "thyroid",
        "nutritional",
        "physical",
    ]


class ParsedClinicalNote(BaseModel):
    original_text: str
    expanded_text: str
    extracted_conditions: list[str] = []
    extracted_medications: list[str] = []


class StructuredHealthInput(BaseModel):
    profile: UserProfile
    parameters: list[ParsedParameter] = []
    clinical_notes: ParsedClinicalNote | None = None
    missing_data_flags: list[str] = []
    data_completeness_score: float = 0.0
    language: str = "en"
