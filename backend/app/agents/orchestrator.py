import logging

from app.agents.state import AgentState

logger = logging.getLogger(__name__)

MAX_RETRIES = 2


async def orchestrator_node(state: AgentState) -> dict:
    """Route pipeline flow: retry failed QA up to MAX_RETRIES times."""
    qa_result = state.get("qa_result")
    retry_count = state.get("retry_count", 0)

    if qa_result and not qa_result.get("passed", True) and retry_count < MAX_RETRIES:
        logger.info(
            "QA failed (attempt %d/%d) — scheduling retry",
            retry_count + 1,
            MAX_RETRIES,
        )
        return {
            "retry_count": retry_count + 1,
            "current_agent": "orchestrator",
        }

    if qa_result and not qa_result.get("passed", True):
        logger.warning("QA still failing after %d retries — proceeding anyway", MAX_RETRIES)

    return {
        "retry_count": retry_count,
        "current_agent": "orchestrator",
    }
