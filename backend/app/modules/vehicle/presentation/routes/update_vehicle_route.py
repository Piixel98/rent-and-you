from fastapi import Depends, status, APIRouter

from app.modules.vehicle.dependencies import get_update_vehicle_use_case
from app.modules.vehicle.domain.entities.vehicle_command_model import VehicleUpdateModel
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.usecases.update_vehicle import UpdateVehicleUseCase
from app.modules.vehicle.presentation.schemas.vehicle_error_message import (
    ErrorMessageVehicleNotFound,
)


router = APIRouter()


@router.patch(
    "/{id_}/",
    response_model=VehicleReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageVehicleNotFound}},
)
async def update_vehicle(
    id_: int,
    data: VehicleUpdateModel,
    update_vehicle_use_case: UpdateVehicleUseCase = Depends(
        get_update_vehicle_use_case
    ),
):
    vehicle = update_vehicle_use_case((id_, data))
    return vehicle
