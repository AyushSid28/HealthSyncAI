"""Generate health report PDFs using ReportLab."""

import io
import os
from pathlib import Path
from datetime import datetime

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from app.templates.styles import (
    PRIMARY, SUCCESS, WARNING, DANGER, CRITICAL, TEXT_PRIMARY, TEXT_SECONDARY,
    BACKGROUND, BORDER, SEVERITY_COLORS,
    FONT_TITLE, FONT_HEADING, FONT_BODY,
    FONT_SIZE_TITLE, FONT_SIZE_HEADING, FONT_SIZE_BODY, FONT_SIZE_SMALL,
    PAGE_MARGIN,
)

_FONT_DIR = Path(__file__).resolve().parent.parent / "templates" / "fonts"
_HINDI_FONT_REGISTERED = False


def _register_hindi_font():
    global _HINDI_FONT_REGISTERED
    if _HINDI_FONT_REGISTERED:
        return
    font_path = _FONT_DIR / "NotoSansDevanagari.ttf"
    if font_path.exists():
        pdfmetrics.registerFont(TTFont("NotoDevanagari", str(font_path)))
        _HINDI_FONT_REGISTERED = True


def _build_styles(lang: str = "en"):
    styles = getSampleStyleSheet()

    if lang == "hi":
        _register_hindi_font()
        body_font = "NotoDevanagari"
        heading_font = "NotoDevanagari"
        title_font = "NotoDevanagari"
    else:
        body_font = FONT_BODY
        heading_font = FONT_HEADING
        title_font = FONT_TITLE

    styles.add(ParagraphStyle(
        "ReportTitle", parent=styles["Title"],
        fontName=title_font, fontSize=FONT_SIZE_TITLE,
        textColor=PRIMARY, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        "SectionHeading", parent=styles["Heading2"],
        fontName=heading_font, fontSize=FONT_SIZE_HEADING,
        textColor=PRIMARY, spaceBefore=16, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        "BodyText2", parent=styles["BodyText"],
        fontName=body_font, fontSize=FONT_SIZE_BODY,
        textColor=TEXT_PRIMARY, leading=14,
    ))
    styles.add(ParagraphStyle(
        "SmallText", parent=styles["BodyText"],
        fontName=body_font, fontSize=FONT_SIZE_SMALL,
        textColor=TEXT_SECONDARY,
    ))
    styles.add(ParagraphStyle(
        "UrgencyText", parent=styles["BodyText"],
        fontName=heading_font, fontSize=FONT_SIZE_BODY,
        textColor=DANGER, backColor=BACKGROUND,
        borderPadding=8, leading=14,
    ))
    return styles


def generate_pdf(report: dict) -> bytes:
    """Generate a PDF from a FullReport dict. Returns raw PDF bytes."""
    lang = report.get("language", "en")
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A4,
        leftMargin=PAGE_MARGIN, rightMargin=PAGE_MARGIN,
        topMargin=PAGE_MARGIN, bottomMargin=PAGE_MARGIN,
    )
    styles = _build_styles(lang)
    tbl_font = "NotoDevanagari" if lang == "hi" and _HINDI_FONT_REGISTERED else FONT_HEADING
    elements = []

    elements.append(Paragraph("HealthSync AI", styles["ReportTitle"]))
    elements.append(Paragraph("Personalized Health Report", styles["SmallText"]))
    elements.append(Spacer(1, 4 * mm))
    elements.append(HRFlowable(width="100%", thickness=1, color=BORDER))
    elements.append(Spacer(1, 4 * mm))

    urgency_alerts = report.get("urgency_alerts", [])
    if urgency_alerts:
        for alert in urgency_alerts:
            elements.append(Paragraph(
                f"⚠ URGENT: {alert}", styles["UrgencyText"]
            ))
        elements.append(Spacer(1, 4 * mm))

    # Section 1: Profile Summary
    profile = report.get("profile_summary", {})
    elements.append(Paragraph("1. Profile Summary", styles["SectionHeading"]))
    content = profile.get("content", "")
    if isinstance(content, dict):
        for k, v in content.items():
            elements.append(Paragraph(f"<b>{k}:</b> {v}", styles["BodyText2"]))
    else:
        elements.append(Paragraph(str(content), styles["BodyText2"]))
    elements.append(Spacer(1, 3 * mm))

    # Section 2: Key Observations
    obs = report.get("key_observations", {})
    elements.append(Paragraph("2. Key Observations", styles["SectionHeading"]))
    obs_content = obs.get("content", [])
    if isinstance(obs_content, list):
        for item in obs_content:
            elements.append(Paragraph(f"• {item}", styles["BodyText2"]))
    else:
        elements.append(Paragraph(str(obs_content), styles["BodyText2"]))
    elements.append(Spacer(1, 3 * mm))

    # Section 3: Interpreted Findings
    elements.append(Paragraph("3. Interpreted Findings", styles["SectionHeading"]))
    findings = report.get("interpreted_findings", [])
    for f in findings:
        name = f.get("parameter_name", "")
        val = f.get("clinical_value", "")
        interp = f.get("interpretation", "")
        ctx = f.get("context", "")
        elements.append(Paragraph(f"<b>{name}</b> — {val}", styles["BodyText2"]))
        elements.append(Paragraph(interp, styles["BodyText2"]))
        if ctx:
            elements.append(Paragraph(f"<i>{ctx}</i>", styles["SmallText"]))
        elements.append(Spacer(1, 2 * mm))
    elements.append(Spacer(1, 3 * mm))

    # Section 4: Risk Indicators
    elements.append(Paragraph("4. Risk Indicators", styles["SectionHeading"]))
    risk_cards = report.get("risk_indicators", [])
    if risk_cards:
        table_data = [["Indicator", "Value", "Risk Level", "Normal Range"]]
        row_colors = []
        for card in risk_cards:
            table_data.append([
                card.get("indicator", ""),
                card.get("value", ""),
                card.get("severity", "").upper(),
                card.get("threshold_range", ""),
            ])
            row_colors.append(SEVERITY_COLORS.get(card.get("color", "green"), SUCCESS))

        table = Table(table_data, colWidths=[120, 80, 80, 120])
        style_cmds = [
            ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
            ("TEXTCOLOR", (0, 0), (-1, 0), BACKGROUND),
            ("FONTNAME", (0, 0), (-1, 0), tbl_font),
            ("FONTNAME", (0, 1), (-1, -1), tbl_font if lang == "hi" else FONT_BODY),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
        for i, color in enumerate(row_colors):
            style_cmds.append(("TEXTCOLOR", (2, i + 1), (2, i + 1), color))
        table.setStyle(TableStyle(style_cmds))
        elements.append(table)
    elements.append(Spacer(1, 3 * mm))

    # Section 5: Wellness Insights
    elements.append(Paragraph("5. Wellness Insights", styles["SectionHeading"]))
    ws = report.get("wellness_score", {})
    score = ws.get("composite_score", 0)
    elements.append(Paragraph(
        f"<b>Overall Wellness Score: {score}/100</b>", styles["BodyText2"]
    ))
    dims = ws.get("dimensions", {})
    if dims:
        dim_data = [["Dimension", "Score"]]
        for dim_name, dim_score in dims.items():
            dim_data.append([dim_name.replace("_", " ").title(), f"{dim_score}/100"])
        dim_table = Table(dim_data, colWidths=[200, 80])
        dim_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
            ("TEXTCOLOR", (0, 0), (-1, 0), BACKGROUND),
            ("FONTNAME", (0, 0), (-1, -1), tbl_font),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]))
        elements.append(dim_table)
    wellness_section = report.get("wellness_insights", {})
    wi_content = wellness_section.get("content", "")
    if wi_content and isinstance(wi_content, str):
        elements.append(Spacer(1, 2 * mm))
        elements.append(Paragraph(wi_content, styles["BodyText2"]))
    elements.append(Spacer(1, 3 * mm))

    # Section 6: Personalized Recommendations
    elements.append(Paragraph("6. Personalized Recommendations", styles["SectionHeading"]))
    recs = report.get("personalized_recommendations", [])
    for rec in recs:
        priority = rec.get("priority", "recommended")
        prefix = {"essential": "🔴", "recommended": "🟡", "optional": "🟢"}.get(priority, "•")
        elements.append(Paragraph(
            f"{prefix} <b>{rec.get('title', '')}</b> [{rec.get('category', '')}]",
            styles["BodyText2"],
        ))
        elements.append(Paragraph(rec.get("description", ""), styles["BodyText2"]))
        elements.append(Paragraph(
            f"Timeframe: {rec.get('timeframe', '')} | Priority: {priority}",
            styles["SmallText"],
        ))
        elements.append(Spacer(1, 2 * mm))
    elements.append(Spacer(1, 3 * mm))

    # Section 7: Preventive Lifestyle Suggestions
    prev = report.get("preventive_lifestyle", {})
    elements.append(Paragraph("7. Preventive Lifestyle Suggestions", styles["SectionHeading"]))
    prev_content = prev.get("content", "")
    if isinstance(prev_content, list):
        for item in prev_content:
            elements.append(Paragraph(f"• {item}", styles["BodyText2"]))
    elif isinstance(prev_content, str):
        elements.append(Paragraph(prev_content, styles["BodyText2"]))
    elements.append(Spacer(1, 6 * mm))

    # Disclaimer
    elements.append(HRFlowable(width="100%", thickness=0.5, color=BORDER))
    elements.append(Spacer(1, 2 * mm))
    disclaimer = report.get(
        "disclaimer",
        "This report is AI-generated and not a substitute for professional medical advice.",
    )
    elements.append(Paragraph(disclaimer, styles["SmallText"]))
    elements.append(Paragraph(
        f"Generated on {datetime.utcnow().strftime('%B %d, %Y at %H:%M UTC')} by HealthSync AI",
        styles["SmallText"],
    ))

    doc.build(elements)
    return buf.getvalue()


def save_pdf(report: dict, output_dir: str = "generated_reports") -> str:
    """Generate and save PDF to disk. Returns the file path."""
    os.makedirs(output_dir, exist_ok=True)
    report_id = report.get("report_id", "report")
    filename = f"healthsync_{report_id}.pdf"
    filepath = os.path.join(output_dir, filename)

    pdf_bytes = generate_pdf(report)
    with open(filepath, "wb") as f:
        f.write(pdf_bytes)

    return filepath
