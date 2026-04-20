"""Send report via Gmail SMTP."""

import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

from app.config import get_settings
from app.services.pdf_generator import generate_pdf

logger = logging.getLogger(__name__)


def send_report_email(
    to_email: str,
    report: dict,
    report_id: str,
) -> dict:
    """Send the health report as a PDF attachment via Gmail SMTP."""
    settings = get_settings()

    if not settings.gmail_address or not settings.gmail_app_password:
        return {"success": False, "error": "Gmail credentials not configured"}

    wellness_score = report.get("wellness_score", {}).get("composite_score", "N/A")
    profile = report.get("profile_summary", {}).get("content", {})
    patient_name = profile.get("Name", "Patient") if isinstance(profile, dict) else "Patient"

    msg = MIMEMultipart()
    msg["From"] = settings.gmail_address
    msg["To"] = to_email
    msg["Subject"] = f"HealthSync AI — Health Report for {patient_name}"

    report_url = f"{settings.frontend_url}/dashboard/{report_id}"

    html_body = f"""\
    <html>
    <body style="font-family: -apple-system, sans-serif; color: #1E293B; max-width: 600px;">
        <div style="background: #2563EB; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 22px;">HealthSync AI</h1>
            <p style="margin: 8px 0 0; opacity: 0.9;">Your Personalized Health Report</p>
        </div>
        <div style="padding: 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
            <p>Hi {patient_name},</p>
            <p>Your AI-powered health assessment is ready.</p>
            <div style="background: #F8FAFC; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
                <p style="margin: 0; color: #64748B; font-size: 14px;">Wellness Score</p>
                <p style="margin: 4px 0 0; font-size: 36px; font-weight: bold; color: #2563EB;">{wellness_score}/100</p>
            </div>
            <p>Your full report is attached as a PDF. You can also view it online:</p>
            <p><a href="{report_url}" style="color: #2563EB; font-weight: 600;">{report_url}</a></p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;">
            <p style="font-size: 12px; color: #94A3B8;">
                This report is AI-generated and not a substitute for professional medical advice.
                Always consult a qualified healthcare provider.
            </p>
        </div>
    </body>
    </html>
    """
    msg.attach(MIMEText(html_body, "html"))

    try:
        pdf_bytes = generate_pdf(report)
        pdf_attachment = MIMEApplication(pdf_bytes, _subtype="pdf")
        pdf_attachment.add_header(
            "Content-Disposition", "attachment",
            filename=f"healthsync_report_{report_id[:8]}.pdf",
        )
        msg.attach(pdf_attachment)
    except Exception as e:
        logger.warning("PDF generation failed for email: %s", e)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(settings.gmail_address, settings.gmail_app_password)
            server.sendmail(settings.gmail_address, to_email, msg.as_string())
        logger.info("Email sent to %s", to_email)
        return {"success": True}
    except Exception as e:
        logger.error("Email failed: %s", e)
        return {"success": False, "error": str(e)}
