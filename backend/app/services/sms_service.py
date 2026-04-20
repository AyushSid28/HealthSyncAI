"""Send SMS via Twilio."""

import logging
from twilio.rest import Client

from app.config import get_settings

logger = logging.getLogger(__name__)


def send_sms(to_number: str, report_id: str, wellness_score: int | None = None, lang: str = "en") -> dict:
    """Send an SMS with the report link."""
    settings = get_settings()

    if not settings.twilio_account_sid or not settings.twilio_auth_token:
        return {"success": False, "error": "Twilio credentials not configured"}

    score_line = f"Wellness Score: {wellness_score}/100\n" if wellness_score else ""
    report_url = f"{settings.frontend_url}/dashboard/{report_id}"
    pdf_lang = f"?lang={lang}" if lang != "en" else ""
    lang_label = " (Hindi)" if lang == "hi" else ""

    body = (
        f"HealthSync AI Report Ready!{lang_label}\n\n"
        f"{score_line}"
        f"View your full health report:\n{report_url}\n\n"
        f"Download PDF:\n{settings.frontend_url.replace('localhost:3000', 'localhost:8000')}"
        f"/api/v1/reports/{report_id}/pdf{pdf_lang}"
    )

    try:
        client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
        message = client.messages.create(
            body=body,
            from_=settings.twilio_phone_number,
            to=to_number,
        )
        logger.info("SMS sent to %s — SID: %s", to_number, message.sid)
        return {"success": True, "message_sid": message.sid}
    except Exception as e:
        logger.error("SMS failed: %s", e)
        return {"success": False, "error": str(e)}
