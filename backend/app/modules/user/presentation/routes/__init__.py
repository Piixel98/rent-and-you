from fastapi import APIRouter

from app.dependencies import get_settings
from .user_routes import router

settings = get_settings()
user_router = APIRouter()
user_router.include_router(router, prefix=f"{settings.API_V1_STR}/users", tags=["User"])


__all__ = ["user_router"]
