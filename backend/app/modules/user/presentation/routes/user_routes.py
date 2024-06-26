from fastapi import APIRouter, Depends

from app.core.auth import get_current_active_admin
from .create_user_route import router as create_user_route
from .delete_user_route import router as delete_user_route
from .get_user_route import router as get_user_route
from .get_users_route import router as get_users_route
from .update_user_route import router as update_user_route

router = APIRouter()
router.include_router(
    create_user_route, dependencies=[Depends(get_current_active_admin)]
)
router.include_router(
    delete_user_route, dependencies=[Depends(get_current_active_admin)]
)
router.include_router(get_user_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(get_users_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(
    update_user_route, dependencies=[Depends(get_current_active_admin)]
)
