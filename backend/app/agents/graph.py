"""
LangGraph state graph — single-pass sequential pipeline.

Flow:
  document_ingestion (if doc uploaded) → input_parser → medical_interpreter
    → risk_stratifier → recommendation_engine → report_compiler → END
"""

from langgraph.graph import StateGraph, END

from .state import AgentState
from .document_ingestion import document_ingestion_node
from .input_parser import input_parser_node
from .medical_interpreter import medical_interpreter_node
from .risk_stratifier import risk_stratifier_node
from .recommendation import recommendation_node
from .report_compiler import report_compiler_node


def _needs_document_ingestion(state: AgentState) -> str:
    raw = state.get("raw_input", {})
    if raw.get("document_text", "").strip():
        return "document_ingestion"
    return "input_parser"


def build_graph() -> StateGraph:
    workflow = StateGraph(AgentState)

    workflow.add_node("document_ingestion", document_ingestion_node)
    workflow.add_node("input_parser", input_parser_node)
    workflow.add_node("medical_interpreter", medical_interpreter_node)
    workflow.add_node("risk_stratifier", risk_stratifier_node)
    workflow.add_node("recommendation_engine", recommendation_node)
    workflow.add_node("report_compiler", report_compiler_node)

    workflow.set_conditional_entry_point(_needs_document_ingestion)
    workflow.add_edge("document_ingestion", "input_parser")
    workflow.add_edge("input_parser", "medical_interpreter")
    workflow.add_edge("medical_interpreter", "risk_stratifier")
    workflow.add_edge("risk_stratifier", "recommendation_engine")
    workflow.add_edge("recommendation_engine", "report_compiler")
    workflow.add_edge("report_compiler", END)

    return workflow


compiled_graph = build_graph().compile()


async def run_pipeline(assessment_input: dict) -> dict:
    initial_state: AgentState = {
        "raw_input": assessment_input,
        "structured_input": None,
        "interpreted_findings": None,
        "risk_cards": None,
        "wellness_score": None,
        "recommendations": None,
        "qa_result": None,
        "retry_count": 0,
        "final_report": None,
        "pdf_path": None,
        "current_agent": "",
        "errors": [],
        "language": assessment_input.get("language", "en"),
    }

    result = await compiled_graph.ainvoke(initial_state)
    return result
