import json
import logging

from app.agents.llm import call_llm
from app.agents.state import AgentState
from app.prompts import INPUT_PARSER_PROMPT

logger = logging.getLogger(__name__)


async def input_parser_node(state: AgentState) -> dict:
    """Parse raw health-assessment input into a structured format via Claude."""
    raw_input = state["raw_input"]
    user_message = json.dumps(raw_input, default=str)

    try:
        parsed_result = await call_llm(INPUT_PARSER_PROMPT, user_message)
    except Exception as exc:
        logger.error("input_parser_node failed: %s", exc)
        return {
            "structured_input": None,
            "current_agent": "input_parser",
            "errors": [f"input_parser: {exc}"],
        }

    return {
        "structured_input": parsed_result,
        "current_agent": "input_parser",
    }
