import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState
from app.prompts import RECOMMENDATION_PROMPT

logger = logging.getLogger(__name__)

REC_KEYS = ("recommendations", "personalized_recommendations", "results", "suggestions")


def _extract_recommendations(result: dict | list) -> list:
    if isinstance(result, list):
        return result
    for key in REC_KEYS:
        if key in result and isinstance(result[key], list):
            return result[key]
    for val in result.values():
        if isinstance(val, list) and len(val) > 0:
            first = val[0]
            if isinstance(first, dict) and "title" in first:
                return val
    return []


async def recommendation_node(state: AgentState) -> dict:
    interpreted_findings = state.get("interpreted_findings")
    risk_cards = state.get("risk_cards")
    structured_input = state.get("structured_input")

    if not structured_input:
        return {
            "recommendations": None,
            "current_agent": "recommendation",
            "errors": ["recommendation: missing structured_input"],
        }

    combined_input = {
        "structured_input": structured_input,
        "interpreted_findings": interpreted_findings or [],
        "risk_cards": risk_cards or [],
    }
    user_message = json.dumps(combined_input, default=str)

    try:
        result = await call_llm(RECOMMENDATION_PROMPT, user_message)
        recs_list = _extract_recommendations(result)
        logger.info("recommendation produced %d items", len(recs_list))
    except Exception as exc:
        logger.error("recommendation_node failed: %s", exc)
        return {
            "recommendations": None,
            "current_agent": "recommendation",
            "errors": [f"recommendation: {exc}"],
        }

    return {
        "recommendations": recs_list,
        "current_agent": "recommendation",
    }
