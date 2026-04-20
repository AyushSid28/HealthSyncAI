"""PDF report styling constants."""

from reportlab.lib.colors import HexColor

PRIMARY = HexColor("#2563EB")
SUCCESS = HexColor("#16A34A")
WARNING = HexColor("#F59E0B")
DANGER = HexColor("#DC2626")
CRITICAL = HexColor("#7F1D1D")
TEXT_PRIMARY = HexColor("#1E293B")
TEXT_SECONDARY = HexColor("#64748B")
BACKGROUND = HexColor("#F8FAFC")
CARD_BG = HexColor("#FFFFFF")
BORDER = HexColor("#E2E8F0")

SEVERITY_COLORS = {
    "green": SUCCESS,
    "amber": WARNING,
    "red": DANGER,
    "dark_red": CRITICAL,
}

FONT_TITLE = "Helvetica-Bold"
FONT_HEADING = "Helvetica-Bold"
FONT_BODY = "Helvetica"
FONT_SIZE_TITLE = 24
FONT_SIZE_HEADING = 14
FONT_SIZE_SUBHEADING = 12
FONT_SIZE_BODY = 10
FONT_SIZE_SMALL = 8

PAGE_MARGIN = 50
LINE_SPACING = 14
