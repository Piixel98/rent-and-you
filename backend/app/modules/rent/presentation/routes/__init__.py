from fastapi import APIRouter

from app.dependencies import get_settings
from .rent_routes import router

settings = get_settings()
rent_router = APIRouter()
rent_router.include_router(router, prefix=f"{settings.API_V1_STR}/rents", tags=["Rent"])


__all__ = ["rent_router"]
