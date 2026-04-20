import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState
from app.prompts import QA_VALIDATOR_PROMPT

logger = logging.getLogger(__name__)


async def qa_validator_node(state: AgentState) -> dict:
    """Validate all agent outputs for consistency, tone, and completeness."""
    pipeline_outputs = {
        "structured_input": state.get("structured_input"),
        "interpreted_findings": state.get("interpreted_findings"),
        "risk_cards": state.get("risk_cards"),
        "wellness_score": state.get("wellness_score"),
        "recommendations": state.get("recommendations"),
    }

    has_data = any(v is not None for v in pipeline_outputs.values())
    if not has_data:
        return {
            "qa_result": {
                "passed": False,
                "issues": [{
                    "check_type": "completeness",
                    "description": "No agent outputs available for validation",
                    "severity": "blocker",
                    "affected_section": "all",
                }],
                "corrections": [],
            },
            "current_agent": "qa_validator",
        }

    user_message = json.dumps(pipeline_outputs, default=str)

    try:
        qa_dict = await call_llm(QA_VALIDATOR_PROMPT, user_message)
    except Exception as exc:
        logger.error("qa_validator_node failed: %s", exc)
        return {
            "qa_result": {
                "passed": False,
                "issues": [{
                    "check_type": "consistency",
                    "description": f"QA validation call failed: {exc}",
                    "severity": "blocker",
                    "affected_section": "qa_validator",
                }],
                "corrections": [],
            },
            "current_agent": "qa_validator",
            "errors": [f"qa_validator: {exc}"],
        }

    if "passed" not in qa_dict:
        issues = qa_dict.get("issues", [])
        has_blocker = any(i.get("severity") == "blocker" for i in issues)
        qa_dict["passed"] = not has_blocker

    return {
        "qa_result": qa_dict,
        "current_agent": "qa_validator",
    }
