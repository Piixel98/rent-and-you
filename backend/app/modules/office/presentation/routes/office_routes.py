from fastapi import APIRouter

from .get_office_vehicles_route import router as get_office_vehicles_route
from .create_office_route import router as create_office_route
from .delete_office_route import router as delete_office_route
from .get_office_route import router as get_office_route
from .get_offices_route import router as get_offices_route
from .update_office_route import router as update_office_route

router = APIRouter()
router.include_router(create_office_route)
router.include_router(delete_office_route)
router.include_router(get_office_route)
router.include_router(get_offices_route)
router.include_router(update_office_route)
router.include_router(get_office_vehicles_route)
