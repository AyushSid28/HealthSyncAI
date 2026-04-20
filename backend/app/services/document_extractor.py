"""Extract text from uploaded documents (PDF, images)."""

import io
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text content from a PDF file."""
    try:
        from reportlab.lib.pagesizes import A4
    except ImportError:
        pass

    try:
        import fitz  # PyMuPDF
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        pages = []
        for page in doc:
            pages.append(page.get_text())
        doc.close()
        return "\n".join(pages).strip()
    except ImportError:
        pass

    try:
        from pdfminer.high_level import extract_text as pdfminer_extract
        return pdfminer_extract(io.BytesIO(file_bytes)).strip()
    except ImportError:
        pass

    return ""


def extract_text_from_image(file_bytes: bytes) -> str:
    """Extract text from an image using OCR (Tesseract via pytesseract)."""
    try:
        from PIL import Image
        import pytesseract
        img = Image.open(io.BytesIO(file_bytes))
        return pytesseract.image_to_string(img).strip()
    except ImportError:
        logger.warning("pytesseract not installed — skipping OCR")
        return ""
    except Exception as e:
        logger.error("OCR failed: %s", e)
        return ""


def extract_text(file_bytes: bytes, filename: str) -> str:
    """Extract text from a file based on its extension."""
    ext = Path(filename).suffix.lower()

    if ext == ".pdf":
        text = extract_text_from_pdf(file_bytes)
        if text:
            return text
        return extract_text_from_image(file_bytes)

    if ext in (".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"):
        return extract_text_from_image(file_bytes)

    if ext in (".txt", ".csv"):
        return file_bytes.decode("utf-8", errors="replace").strip()

    return ""
