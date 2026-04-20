"""Document ingestion agent — extracts structured health data from uploaded document text."""

import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState

logger = logging.getLogger(__name__)

DOCUMENT_EXTRACTION_PROMPT = """\
You are a medical document parser. You receive raw text extracted from a health \
report, lab report, prescription, or clinical document.

Your job: extract ALL health-related data into a structured JSON object.

Return this exact JSON structure:
{
  "extracted_profile": {
    "name": "patient name if found, else null",
    "age": null or integer,
    "gender": "male/female/other or null",
    "medical_history": ["list of conditions found"],
    "current_medications": ["list of medications found with dosages"],
    "allergies": ["list of allergies found"]
  },
  "extracted_parameters": {
    "blood_pressure_systolic": null or number,
    "blood_pressure_diastolic": null or number,
    "heart_rate": null or number,
    "blood_glucose_fasting": null or number,
    "blood_glucose_pp": null or number,
    "hba1c": null or number,
    "total_cholesterol": null or number,
    "hdl_cholesterol": null or number,
    "ldl_cholesterol": null or number,
    "triglycerides": null or number,
    "bmi": null or number,
    "hemoglobin": null or number,
    "creatinine": null or number,
    "tsh": null or number,
    "vitamin_d": null or number,
    "vitamin_b12": null or number
  },
  "clinical_summary": "A brief 2-3 sentence summary of what this document contains",
  "raw_findings": "All clinical text/findings copied verbatim from the document"
}

Rules:
- Extract EVERY numeric health value you can find
- Recognize common abbreviations: BP, FBS, PPBS, HbA1c, TC, HDL, LDL, TG, TSH, BMI, Hb, Cr, etc.
- If a value has units, extract just the number for the parameter fields
- For blood pressure like "140/90", split into systolic=140 and diastolic=90
- If patient name/age/gender are present, extract them
- Look for medication names and dosages
- Look for diagnoses and conditions (diabetes, hypertension, etc.)
- Set fields to null if not found — do NOT guess or hallucinate values
- Return ONLY the JSON object
"""


async def document_ingestion_node(state: AgentState) -> dict:
    """Extract structured health data from uploaded document text."""
    raw_input = state.get("raw_input", {})
    doc_text = raw_input.get("document_text", "")

    if not doc_text or not doc_text.strip():
        return {"current_agent": "document_ingestion"}

    try:
        result = await call_llm(DOCUMENT_EXTRACTION_PROMPT, doc_text)
        logger.info("Document ingestion extracted data successfully")
    except Exception as exc:
        logger.error("document_ingestion failed: %s", exc)
        return {
            "current_agent": "document_ingestion",
            "errors": [f"document_ingestion: {exc}"],
        }

    extracted_params = result.get("extracted_parameters", {})
    extracted_profile = result.get("extracted_profile", {})
    clinical_summary = result.get("clinical_summary", "")
    raw_findings = result.get("raw_findings", "")

    current_raw = dict(raw_input)

    if not current_raw.get("clinical_notes") or not current_raw["clinical_notes"].get("raw_text"):
        combined_text = ""
        if clinical_summary:
            combined_text += clinical_summary + "\n\n"
        if raw_findings:
            combined_text += raw_findings
        if combined_text.strip():
            current_raw["clinical_notes"] = {
                "raw_text": combined_text.strip(),
                "source": "doctor_upload",
            }

    if extracted_params:
        existing_params = current_raw.get("parameters") or {}
        for key, val in extracted_params.items():
            if val is not None and not existing_params.get(key):
                existing_params[key] = val
        current_raw["parameters"] = existing_params

    profile = current_raw.get("profile", {})
    if extracted_profile:
        if extracted_profile.get("name") and not profile.get("name"):
            profile["name"] = extracted_profile["name"]
        if extracted_profile.get("age") and not profile.get("age"):
            profile["age"] = extracted_profile["age"]
        if extracted_profile.get("gender") and not profile.get("gender"):
            profile["gender"] = extracted_profile["gender"]
        for field in ("medical_history", "current_medications", "allergies"):
            extracted_list = extracted_profile.get(field, [])
            existing_list = profile.get(field, [])
            merged = list(set(existing_list + extracted_list))
            if merged:
                profile[field] = merged
    current_raw["profile"] = profile

    return {
        "raw_input": current_raw,
        "current_agent": "document_ingestion",
    }
