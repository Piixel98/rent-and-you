from fastapi import APIRouter

from .vehicle_routes import router

vehicle_router = APIRouter()
vehicle_router.include_router(router, prefix="/api/v1/vehicles", tags=["Vehicle"])


__all__ = ["vehicle_router"]
