from fastapi import APIRouter

from app.dependencies import get_settings
from .rgpd_routes import router

settings = get_settings()
rgpd_router = APIRouter()
rgpd_router.include_router(router, prefix=f"{settings.API_V1_STR}/rgpd", tags=["RGPD"])


__all__ = ["rgpd_router"]
