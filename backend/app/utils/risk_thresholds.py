"""
Evidence-based clinical thresholds from WHO, AHA, ADA, and ICMR guidelines.
These are NEVER LLM-generated — hardcoded for deterministic risk assessment.
"""

from dataclasses import dataclass
from typing import Literal


@dataclass
class Threshold:
    low_max: float
    moderate_max: float
    high_max: float
    unit: str
    normal_label: str
    category: str
    higher_is_worse: bool = True


THRESHOLDS: dict[str, Threshold] = {
    "blood_pressure_systolic": Threshold(
        low_max=120, moderate_max=139, high_max=180,
        unit="mmHg", normal_label="<120 mmHg",
        category="cardiovascular",
    ),
    "blood_pressure_diastolic": Threshold(
        low_max=80, moderate_max=89, high_max=120,
        unit="mmHg", normal_label="<80 mmHg",
        category="cardiovascular",
    ),
    "heart_rate": Threshold(
        low_max=100, moderate_max=110, high_max=130,
        unit="bpm", normal_label="60–100 bpm",
        category="cardiovascular",
    ),
    "blood_glucose_fasting": Threshold(
        low_max=99, moderate_max=125, high_max=400,
        unit="mg/dL", normal_label="70–99 mg/dL",
        category="metabolic",
    ),
    "blood_glucose_pp": Threshold(
        low_max=140, moderate_max=199, high_max=400,
        unit="mg/dL", normal_label="<140 mg/dL",
        category="metabolic",
    ),
    "hba1c": Threshold(
        low_max=5.6, moderate_max=6.4, high_max=10.0,
        unit="%", normal_label="<5.7%",
        category="metabolic",
    ),
    "total_cholesterol": Threshold(
        low_max=200, moderate_max=239, high_max=300,
        unit="mg/dL", normal_label="<200 mg/dL",
        category="cardiovascular",
    ),
    "hdl_cholesterol": Threshold(
        low_max=60, moderate_max=40, high_max=30,
        unit="mg/dL", normal_label=">60 mg/dL",
        category="cardiovascular",
        higher_is_worse=False,
    ),
    "ldl_cholesterol": Threshold(
        low_max=100, moderate_max=159, high_max=190,
        unit="mg/dL", normal_label="<100 mg/dL",
        category="cardiovascular",
    ),
    "triglycerides": Threshold(
        low_max=150, moderate_max=199, high_max=500,
        unit="mg/dL", normal_label="<150 mg/dL",
        category="cardiovascular",
    ),
    "bmi": Threshold(
        low_max=24.9, moderate_max=29.9, high_max=40,
        unit="kg/m²", normal_label="18.5–24.9 kg/m²",
        category="physical",
    ),
    "hemoglobin": Threshold(
        low_max=17.5, moderate_max=10.0, high_max=7.0,
        unit="g/dL", normal_label="12–17.5 g/dL",
        category="hematological",
        higher_is_worse=False,
    ),
    "creatinine": Threshold(
        low_max=1.2, moderate_max=1.9, high_max=4.0,
        unit="mg/dL", normal_label="0.7–1.2 mg/dL",
        category="renal",
    ),
    "tsh": Threshold(
        low_max=4.0, moderate_max=10.0, high_max=20.0,
        unit="mIU/L", normal_label="0.4–4.0 mIU/L",
        category="thyroid",
    ),
    "vitamin_d": Threshold(
        low_max=30, moderate_max=20, high_max=10,
        unit="ng/mL", normal_label="30–100 ng/mL",
        category="nutritional",
        higher_is_worse=False,
    ),
    "vitamin_b12": Threshold(
        low_max=900, moderate_max=200, high_max=150,
        unit="pg/mL", normal_label="200–900 pg/mL",
        category="nutritional",
        higher_is_worse=False,
    ),
}


def classify_risk(
    param_name: str, value: float
) -> tuple[Literal["low", "moderate", "high", "critical"], Literal["green", "amber", "red", "dark_red"]]:
    """Classify a parameter value into risk level and color using hardcoded thresholds."""
    threshold = THRESHOLDS.get(param_name)
    if not threshold:
        return "low", "green"

    if threshold.higher_is_worse:
        if value <= threshold.low_max:
            return "low", "green"
        elif value <= threshold.moderate_max:
            return "moderate", "amber"
        elif value <= threshold.high_max:
            return "high", "red"
        else:
            return "critical", "dark_red"
    else:
        if value >= threshold.low_max:
            return "low", "green"
        elif value >= threshold.moderate_max:
            return "moderate", "amber"
        elif value >= threshold.high_max:
            return "high", "red"
        else:
            return "critical", "dark_red"


def get_threshold_range(param_name: str) -> str:
    threshold = THRESHOLDS.get(param_name)
    return threshold.normal_label if threshold else "N/A"
