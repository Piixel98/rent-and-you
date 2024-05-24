from fastapi import APIRouter

from app.dependencies import get_settings
from .office_routes import router

settings = get_settings()
office_router = APIRouter()
office_router.include_router(
    router, prefix=f"{settings.API_V1_STR}/offices", tags=["Office"]
)


__all__ = ["office_router"]
