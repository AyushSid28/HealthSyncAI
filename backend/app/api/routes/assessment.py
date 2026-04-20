"""Assessment endpoints — form-based and document upload pipelines."""

import json
import uuid
from fastapi import APIRouter, HTTPException, BackgroundTasks, UploadFile, File, Form
from fastapi.responses import JSONResponse

from app.schemas.input import AssessmentRequest
from app.agents.graph import run_pipeline
from app.services.document_extractor import extract_text

router = APIRouter()

_reports_store: dict[str, dict] = {}
_status_store: dict[str, str] = {}


@router.post("")
async def create_assessment(request: AssessmentRequest, background_tasks: BackgroundTasks):
    assessment_id = str(uuid.uuid4())
    _status_store[assessment_id] = "processing"
    background_tasks.add_task(_run_assessment, assessment_id, request)
    return JSONResponse(
        status_code=202,
        content={
            "assessment_id": assessment_id,
            "status": "processing",
            "message": "Your health assessment is being processed.",
        },
    )


@router.post("/sync")
async def create_assessment_sync(request: AssessmentRequest):
    """Submit form data and wait for results."""
    try:
        raw = request.model_dump()
        result = await run_pipeline(raw)
        final_report = result.get("final_report")
        if not final_report:
            raise HTTPException(status_code=500, detail="Pipeline failed to produce a report")
        report_id = final_report.get("report_id", str(uuid.uuid4()))
        _reports_store[report_id] = final_report
        return {
            "report_id": report_id,
            "status": "completed",
            "report": final_report,
            "errors": result.get("errors", []),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload")
async def create_assessment_with_document(
    file: UploadFile = File(...),
    profile_json: str = Form(default="{}"),
    language: str = Form(default="en"),
):
    """Upload a lab report document (PDF/image/text) and run the full pipeline.

    The document is parsed to extract health parameters, clinical notes,
    and profile data automatically. Any profile fields provided in
    profile_json will take priority over extracted values.
    """
    allowed_types = {
        "application/pdf", "image/png", "image/jpeg", "image/webp",
        "text/plain", "text/csv",
    }
    if file.content_type and file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Allowed: PDF, PNG, JPG, TXT",
        )

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    doc_text = extract_text(file_bytes, file.filename or "upload.pdf")

    try:
        profile = json.loads(profile_json)
    except json.JSONDecodeError:
        profile = {}

    if not profile.get("name"):
        profile["name"] = "Patient"
    if not profile.get("age"):
        profile["age"] = 30
    if not profile.get("gender"):
        profile["gender"] = "other"

    pipeline_input = {
        "profile": profile,
        "clinical_notes": None,
        "parameters": None,
        "language": language,
        "document_text": doc_text,
    }

    try:
        result = await run_pipeline(pipeline_input)
        final_report = result.get("final_report")
        if not final_report:
            raise HTTPException(status_code=500, detail="Pipeline failed to produce a report")
        report_id = final_report.get("report_id", str(uuid.uuid4()))
        _reports_store[report_id] = final_report
        return {
            "report_id": report_id,
            "status": "completed",
            "report": final_report,
            "errors": result.get("errors", []),
            "extracted_text_preview": doc_text[:500] if doc_text else "No text extracted",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{assessment_id}/status")
async def get_assessment_status(assessment_id: str):
    status = _status_store.get(assessment_id)
    if not status:
        raise HTTPException(status_code=404, detail="Assessment not found")
    response = {"assessment_id": assessment_id, "status": status}
    if status == "completed" and assessment_id in _reports_store:
        response["report_id"] = _reports_store[assessment_id].get("report_id")
    return response


async def _run_assessment(assessment_id: str, request: AssessmentRequest):
    try:
        raw = request.model_dump()
        result = await run_pipeline(raw)
        final_report = result.get("final_report", {})
        report_id = final_report.get("report_id", assessment_id)
        _reports_store[report_id] = final_report
        _reports_store[assessment_id] = final_report
        _status_store[assessment_id] = "completed"
    except Exception:
        _status_store[assessment_id] = "failed"
