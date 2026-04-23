"""HealthSync AI — FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.api.routes import api_router

settings = get_settings()

app = FastAPI(
    title="HealthSync AI",
    description="Multi-agent AI health report system",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:3000",
        "https://frontend-three-gamma-95.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {
        "name": "HealthSync AI",
        "version": "0.1.0",
        "docs": "/docs",
    }
