"""Report delivery endpoints — email and SMS with language selection."""

from pydantic import BaseModel
from fastapi import APIRouter, HTTPException

from app.services.sms_service import send_sms
from app.services.email_service import send_report_email
from app.services.translator import translate_report_to_hindi
from .assessment import _reports_store

router = APIRouter()


class SMSRequest(BaseModel):
    report_id: str
    phone_number: str
    lang: str = "en"


class EmailRequest(BaseModel):
    report_id: str
    email: str
    lang: str = "en"


async def _get_report_in_lang(report_id: str, lang: str) -> dict:
    report = _reports_store.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if lang == "hi":
        return await translate_report_to_hindi(report)
    return report


@router.post("/sms")
async def deliver_via_sms(req: SMSRequest):
    report = _reports_store.get(req.report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    score = report.get("wellness_score", {}).get("composite_score")
    lang_label = "Hindi" if req.lang == "hi" else "English"
    result = send_sms(req.phone_number, req.report_id, score, req.lang)

    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "SMS failed"))
    return {"status": "sent", "channel": "sms", "language": lang_label, **result}


@router.post("/email")
async def deliver_via_email(req: EmailRequest):
    report = await _get_report_in_lang(req.report_id, req.lang)

    result = send_report_email(req.email, report, req.report_id)

    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "Email failed"))
    lang_label = "Hindi" if req.lang == "hi" else "English"
    return {"status": "sent", "channel": "email", "language": lang_label, **result}
