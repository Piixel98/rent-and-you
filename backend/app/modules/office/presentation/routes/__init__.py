from fastapi import APIRouter

from .office_routes import router

office_router = APIRouter()
office_router.include_router(router, prefix="/api/v1/offices", tags=["Office"])


__all__ = ["office_router"]
