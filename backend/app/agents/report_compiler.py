"""Assemble final report from whatever agent outputs are available. No LLM call needed."""

import logging
from datetime import datetime, timezone
from uuid import uuid4

from app.agents.state import AgentState

logger = logging.getLogger(__name__)

DISCLAIMER = (
    "This report is AI-generated and not a substitute for professional medical advice. "
    "Always consult a qualified healthcare provider for diagnosis and treatment."
)


async def report_compiler_node(state: AgentState) -> dict:
    structured_input = state.get("structured_input") or {}
    interpreted_findings = state.get("interpreted_findings") or []
    risk_cards = state.get("risk_cards") or []
    wellness_score = state.get("wellness_score") or {"composite_score": 0, "dimensions": {}}
    recommendations = state.get("recommendations") or []
    language = state.get("language", "en")

    raw_input = state.get("raw_input", {})
    si_profile = structured_input.get("profile", {})
    raw_profile = raw_input.get("profile", {})

    def pick(field: str, default="N/A"):
        """Pick from structured_input first, then raw_input."""
        val = si_profile.get(field) or raw_profile.get(field)
        if val is None or val == "" or val == "N/A":
            return default
        return val

    profile_content = {
        "Name": pick("name", "N/A"),
        "Age": str(pick("age", "N/A")),
        "Gender": str(pick("gender", "N/A")).title(),
        "Medical History": ", ".join(pick("medical_history", []) or []) or "None reported",
        "Current Medications": ", ".join(pick("current_medications", []) or []) or "None reported",
        "Allergies": ", ".join(pick("allergies", []) or []) or "None reported",
    }

    key_obs = []
    high_risk = [c for c in risk_cards if c.get("risk_level") in ("HIGH",) or c.get("severity") in ("high", "critical")]
    if high_risk:
        key_obs.append(f"{len(high_risk)} parameter(s) flagged as high risk and need attention.")
    moderate_risk = [c for c in risk_cards if c.get("risk_level") == "MODERATE" or c.get("severity") == "moderate"]
    if moderate_risk:
        key_obs.append(f"{len(moderate_risk)} parameter(s) are in the moderate/borderline range.")
    low_risk = [c for c in risk_cards if c.get("risk_level") == "LOW" or c.get("severity") == "low"]
    if low_risk:
        key_obs.append(f"{len(low_risk)} parameter(s) are within normal range.")
    score = wellness_score.get("composite_score", 0)
    if score:
        key_obs.append(f"Overall Wellness Score: {score}/100.")
    completeness = structured_input.get("data_completeness_score", 0)
    if completeness:
        key_obs.append(f"Data completeness: {int(completeness * 100)}%.")

    urgency_alerts = []
    for card in risk_cards:
        if card.get("urgency_flag"):
            name = card.get("indicator") or card.get("parameter_name", "Unknown")
            urgency_alerts.append(
                f"{name} is at a critical level ({card.get('value', '')}). "
                "Please consult a doctor within 24-48 hours."
            )

    dims = wellness_score.get("dimensions", {})
    insights_lines = []
    for dim, val in dims.items():
        if val is not None:
            label = dim.replace("_", " ").title()
            insights_lines.append(f"{label}: {val}/100")
    insights_text = "; ".join(insights_lines) if insights_lines else "Insufficient data for detailed insights."

    lifestyle_tips = [
        "Aim for at least 30 minutes of moderate exercise most days of the week.",
        "Eat a balanced diet rich in vegetables, whole grains, and lean protein.",
        "Get 7-8 hours of sleep each night.",
        "Stay hydrated — aim for 8 glasses of water daily.",
        "Schedule regular health check-ups to track your progress.",
    ]

    report_dict = {
        "report_id": str(uuid4()),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "language": language,
        "profile_summary": {"title": "Profile Summary", "content": profile_content},
        "key_observations": {"title": "Key Observations", "content": key_obs},
        "interpreted_findings": interpreted_findings,
        "risk_indicators": risk_cards,
        "wellness_insights": {"title": "Wellness Insights", "content": insights_text},
        "personalized_recommendations": recommendations,
        "preventive_lifestyle": {"title": "Preventive Lifestyle Suggestions", "content": lifestyle_tips},
        "wellness_score": wellness_score,
        "urgency_alerts": urgency_alerts,
        "data_completeness": completeness,
        "longitudinal_comparison": None,
        "qa_passed": True,
        "qa_notes": [],
        "disclaimer": DISCLAIMER,
    }

    return {
        "final_report": report_dict,
        "current_agent": "report_compiler",
    }
