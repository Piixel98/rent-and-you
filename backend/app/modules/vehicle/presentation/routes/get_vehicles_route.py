from fastapi import Depends, status, APIRouter

from app.modules.vehicle.dependencies import get_vehicles_use_case
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.usecases.get_vehicles import GetVehiclesUseCase

router = APIRouter()


@router.get("/", response_model=list[VehicleReadModel], status_code=status.HTTP_200_OK)
def get_vehicles(
    office_id: int = None,
    offset: int = 0,
    limit: int = 100,
    get_vehicles_use_case_: GetVehiclesUseCase = Depends(get_vehicles_use_case),
):
    vehicles = get_vehicles_use_case_(office_id=office_id)
    return vehicles
