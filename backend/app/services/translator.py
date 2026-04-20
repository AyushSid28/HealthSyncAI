"""Translate report content to Hindi using LLM."""

import asyncio
import copy
import logging

from app.agents.llm import call_llm

logger = logging.getLogger(__name__)

TRANSLATE_PROMPT = """\
You are a medical report translator. Translate the following health report content \
from English to Hindi (Devanagari script).

Rules:
- Translate ALL text values to Hindi
- Keep medical parameter names in both English and Hindi, e.g. "रक्तचाप (Blood Pressure)"
- Keep numeric values, units, and dates as-is (do not translate numbers)
- Keep the JSON structure EXACTLY the same — same keys, same nesting
- Translate dict values and list items, not dict keys
- Be accurate with medical terminology
- Return ONLY the translated JSON object

Input JSON:
"""


async def translate_report_to_hindi(report: dict) -> dict:
    """Translate a report dict to Hindi. Returns a new dict with translated content."""
    translatable = {
        "profile_summary": report.get("profile_summary"),
        "key_observations": report.get("key_observations"),
        "interpreted_findings": report.get("interpreted_findings", []),
        "wellness_insights": report.get("wellness_insights"),
        "personalized_recommendations": report.get("personalized_recommendations", []),
        "preventive_lifestyle": report.get("preventive_lifestyle"),
        "urgency_alerts": report.get("urgency_alerts", []),
        "disclaimer": report.get("disclaimer", ""),
    }

    import json
    user_message = json.dumps(translatable, ensure_ascii=False, default=str)

    try:
        translated = await call_llm(TRANSLATE_PROMPT, user_message)
    except Exception as e:
        logger.error("Translation failed: %s", e)
        return report

    result = copy.deepcopy(report)
    for key in translatable:
        if key in translated:
            result[key] = translated[key]
    result["language"] = "hi"

    return result
