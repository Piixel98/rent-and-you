from fastapi import APIRouter

from app.dependencies import get_settings
from .auth_routes import router

settings = get_settings()
auth_router = APIRouter()
auth_router.include_router(router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])


__all__ = ["auth_router"]
