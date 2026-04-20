import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState
from app.prompts import MEDICAL_INTERPRETER_PROMPT

logger = logging.getLogger(__name__)

FINDING_KEYS = ("findings", "interpreted_findings", "results", "interpretations")


def _extract_findings(result: dict | list) -> list:
    """Extract findings list from LLM response regardless of wrapper key."""
    if isinstance(result, list):
        return result
    for key in FINDING_KEYS:
        if key in result and isinstance(result[key], list):
            return result[key]
    for val in result.values():
        if isinstance(val, list) and len(val) > 0:
            first = val[0]
            if isinstance(first, dict) and "parameter_name" in first:
                return val
    if "parameter_name" in result:
        return [result]
    return []


async def medical_interpreter_node(state: AgentState) -> dict:
    structured_input = state.get("structured_input")
    if not structured_input:
        return {
            "interpreted_findings": None,
            "current_agent": "medical_interpreter",
            "errors": ["medical_interpreter: no structured_input available"],
        }

    user_message = json.dumps(structured_input, default=str)

    try:
        result = await call_llm(MEDICAL_INTERPRETER_PROMPT, user_message)
        findings_list = _extract_findings(result)
        logger.info("medical_interpreter produced %d findings", len(findings_list))
    except Exception as exc:
        logger.error("medical_interpreter_node failed: %s", exc)
        return {
            "interpreted_findings": None,
            "current_agent": "medical_interpreter",
            "errors": [f"medical_interpreter: {exc}"],
        }

    return {
        "interpreted_findings": findings_list,
        "current_agent": "medical_interpreter",
    }
