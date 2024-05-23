from fastapi import APIRouter

from .create_vehicle_route import router as create_vehicle_route
from .delete_vehicle_route import router as delete_vehicle_route
from .get_vehicle_route import router as get_vehicle_route
from .get_vehicles_route import router as get_vehicles_route
from .update_vehicle_route import router as update_vehicle_route

router = APIRouter()
router.include_router(create_vehicle_route)
router.include_router(delete_vehicle_route)
router.include_router(get_vehicle_route)
router.include_router(get_vehicles_route)
router.include_router(update_vehicle_route)
