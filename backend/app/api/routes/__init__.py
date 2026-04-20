from fastapi import APIRouter
from .health import router as health_router
from .assessment import router as assessment_router
from .reports import router as reports_router
from .delivery import router as delivery_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(assessment_router, prefix="/assess", tags=["assessment"])
api_router.include_router(reports_router, prefix="/reports", tags=["reports"])
api_router.include_router(delivery_router, prefix="/deliver", tags=["delivery"])
