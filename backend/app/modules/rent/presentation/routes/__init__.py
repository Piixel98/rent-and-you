from fastapi import APIRouter

from .rent_routes import router

rent_router = APIRouter()
rent_router.include_router(router, prefix="/api/v1/rents", tags=["Rent"])


__all__ = ["rent_router"]
