from fastapi import Depends, status, APIRouter

from app.modules.vehicle.dependencies import get_delete_vehicle_use_case
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.usecases.delete_vehicle import DeleteVehicleUseCase
from app.modules.vehicle.presentation.schemas.vehicle_error_message import (
    ErrorMessageVehicleNotFound,
)

router = APIRouter()


@router.delete(
    "/{id_}/",
    response_model=VehicleReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageVehicleNotFound}},
)
def delete_vehicle(
    id_: int,
    delete_vehicle_use_case: DeleteVehicleUseCase = Depends(
        get_delete_vehicle_use_case
    ),
):
    vehicle = delete_vehicle_use_case((id_,))
    return vehicle
