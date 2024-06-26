from fastapi import Depends, status, APIRouter

from app.modules.vehicle.dependencies import get_vehicle_use_case
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.usecases.get_vehicle import GetVehicleUseCase
from app.modules.vehicle.presentation.schemas.vehicle_error_message import (
    ErrorMessageVehicleNotFound,
)

router = APIRouter()


@router.get(
    "/{id_}/",
    response_model=VehicleReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageVehicleNotFound}},
)
def get_vehicle(
    id_: int, get_vehicle_use_case_: GetVehicleUseCase = Depends(get_vehicle_use_case)
):
    vehicle = get_vehicle_use_case_((id_,))
    return vehicle
