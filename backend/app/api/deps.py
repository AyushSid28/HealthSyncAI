"""Shared API dependencies."""

from app.config import get_settings, Settings


def get_current_settings() -> Settings:
    return get_settings()
