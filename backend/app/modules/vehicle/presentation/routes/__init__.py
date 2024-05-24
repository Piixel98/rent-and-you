from fastapi import APIRouter

from app.dependencies import get_settings
from .vehicle_routes import router

settings = get_settings()
vehicle_router = APIRouter()
vehicle_router.include_router(
    router, prefix=f"{settings.API_V1_STR}/vehicles", tags=["Vehicle"]
)


__all__ = ["vehicle_router"]
