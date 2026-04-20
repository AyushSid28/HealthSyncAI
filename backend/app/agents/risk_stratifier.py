import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState
from app.prompts import RISK_STRATIFIER_PROMPT
from app.utils.risk_thresholds import classify_risk, get_threshold_range

logger = logging.getLogger(__name__)


def _apply_deterministic_thresholds(risk_cards: list, parameters: list) -> list:
    """Override LLM-generated severity/color with hardcoded clinical thresholds."""
    param_map = {p["name"]: p["value"] for p in parameters if "name" in p and "value" in p}

    for card in risk_cards:
        indicator = card.get("indicator", "")
        if indicator in param_map:
            severity, color = classify_risk(indicator, param_map[indicator])
            card["severity"] = severity
            card["color"] = color
            card["threshold_range"] = get_threshold_range(indicator)
            card["urgency_flag"] = severity == "critical"

    return risk_cards


async def risk_stratifier_node(state: AgentState) -> dict:
    """Stratify risk using Claude for narrative + deterministic thresholds for severity."""
    structured_input = state.get("structured_input")
    if not structured_input:
        return {
            "risk_cards": None,
            "wellness_score": None,
            "current_agent": "risk_stratifier",
            "errors": ["risk_stratifier: no structured_input available"],
        }

    user_message = json.dumps(structured_input, default=str)

    try:
        result = await call_llm(RISK_STRATIFIER_PROMPT, user_message)
    except Exception as exc:
        logger.error("risk_stratifier_node failed: %s", exc)
        return {
            "risk_cards": None,
            "wellness_score": None,
            "current_agent": "risk_stratifier",
            "errors": [f"risk_stratifier: {exc}"],
        }

    raw_cards = result.get("risk_cards", [])
    parameters = structured_input.get("parameters", [])
    cards = _apply_deterministic_thresholds(raw_cards, parameters)
    score = result.get("wellness_score", {"composite_score": 0, "dimensions": {}})

    return {
        "risk_cards": cards,
        "wellness_score": score,
        "current_agent": "risk_stratifier",
    }
