from fastapi import APIRouter, Depends

from app.core.auth import get_current_active_admin, get_current_active_user
from .create_rent_route import router as create_rent_route
from .delete_rent_route import router as delete_rent_route
from .get_rent_route import router as get_rent_route
from .get_rents_route import router as get_rents_route
from .update_rent_route import router as update_rent_route


router = APIRouter()
router.include_router(
    create_rent_route, dependencies=[Depends(get_current_active_user)]
)
router.include_router(
    delete_rent_route, dependencies=[Depends(get_current_active_admin)]
)
router.include_router(get_rent_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(get_rents_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(
    update_rent_route, dependencies=[Depends(get_current_active_admin)]
)
