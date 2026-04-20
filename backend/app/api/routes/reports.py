"""Report retrieval and PDF download endpoints."""

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response

from app.services.pdf_generator import generate_pdf
from app.services.translator import translate_report_to_hindi
from .assessment import _reports_store

router = APIRouter()


@router.get("/{report_id}")
async def get_report(report_id: str):
    report = _reports_store.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/{report_id}/pdf")
async def download_pdf(report_id: str, lang: str = "en"):
    """Download report as PDF. Use ?lang=hi for Hindi."""
    report = _reports_store.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    if lang == "hi":
        report = await translate_report_to_hindi(report)

    pdf_bytes = generate_pdf(report)
    lang_suffix = f"_{lang}" if lang != "en" else ""
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="healthsync_{report_id}{lang_suffix}.pdf"'
        },
    )


@router.get("")
async def list_reports():
    summaries = []
    for rid, report in _reports_store.items():
        summaries.append({
            "report_id": rid,
            "generated_at": report.get("generated_at"),
            "wellness_score": report.get("wellness_score", {}).get("composite_score"),
            "language": report.get("language", "en"),
        })
    return {"reports": summaries}
