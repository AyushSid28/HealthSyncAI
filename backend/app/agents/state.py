from typing import Annotated, TypedDict
from operator import add


def _last_value(a: str, b: str) -> str:
    """Reducer that keeps the last written value (for concurrent updates)."""
    return b


class AgentState(TypedDict, total=False):
    raw_input: dict
    structured_input: dict | None
    interpreted_findings: list | None
    risk_cards: list | None
    wellness_score: dict | None
    recommendations: list | None
    qa_result: dict | None
    retry_count: int
    final_report: dict | None
    pdf_path: str | None
    current_agent: Annotated[str, _last_value]
    errors: Annotated[list, add]
    language: str
