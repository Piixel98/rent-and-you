from fastapi import APIRouter, Depends

from app.core.auth import get_current_active_user, get_current_active_admin
from .create_rgpd_route import router as create_rgpd_route
from .delete_rgpd_route import router as delete_rgpd_route
from .get_rgpd_route import router as get_rgpd_route
from .get_rgpds_route import router as get_rgpds_route
from .update_rgpd_route import router as update_rgpd_route

router = APIRouter()
router.include_router(
    create_rgpd_route, dependencies=[Depends(get_current_active_user)]
)
router.include_router(
    delete_rgpd_route, dependencies=[Depends(get_current_active_admin)]
)
router.include_router(get_rgpd_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(get_rgpds_route, dependencies=[Depends(get_current_active_admin)])
router.include_router(
    update_rgpd_route, dependencies=[Depends(get_current_active_admin)]
)
