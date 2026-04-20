from __future__ import annotations
from pydantic import BaseModel, Field
from typing import Literal


class LifestyleParams(BaseModel):
    smoking: bool = False
    alcohol_frequency: Literal["none", "occasional", "moderate", "heavy"] = "none"
    exercise_frequency: Literal["sedentary", "light", "moderate", "active"] = "sedentary"
    diet_type: Literal["vegetarian", "non_vegetarian", "vegan", "other"] = "other"
    sleep_hours: float | None = None


class ClinicalNotes(BaseModel):
    raw_text: str = ""
    source: Literal["manual", "voice", "doctor_upload"] = "manual"


class UserProfile(BaseModel):
    name: str
    age: int = Field(ge=0, le=150)
    gender: Literal["male", "female", "other"]
    medical_history: list[str] = Field(default_factory=list)
    current_medications: list[str] = Field(default_factory=list)
    allergies: list[str] = Field(default_factory=list)
    lifestyle: LifestyleParams | None = None


class QuantitativeParams(BaseModel):
    blood_pressure_systolic: float | None = None
    blood_pressure_diastolic: float | None = None
    heart_rate: float | None = None
    blood_glucose_fasting: float | None = None
    blood_glucose_pp: float | None = None
    hba1c: float | None = None
    total_cholesterol: float | None = None
    hdl_cholesterol: float | None = None
    ldl_cholesterol: float | None = None
    triglycerides: float | None = None
    bmi: float | None = None
    hemoglobin: float | None = None
    creatinine: float | None = None
    tsh: float | None = None
    vitamin_d: float | None = None
    vitamin_b12: float | None = None


class AssessmentRequest(BaseModel):
    clinical_notes: ClinicalNotes | None = None
    profile: UserProfile
    parameters: QuantitativeParams | None = None
    language: Literal["en", "hi", "mr"] = "en"
