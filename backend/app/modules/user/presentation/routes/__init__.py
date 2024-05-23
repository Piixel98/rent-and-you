from fastapi import APIRouter

from .user_routes import router

user_router = APIRouter()
user_router.include_router(router, prefix="/api/v1/users", tags=["User"])


__all__ = ["user_router"]
