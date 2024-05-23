from fastapi import status, Depends, Response, Request, APIRouter
from app.modules.vehicle.dependencies import get_create_vehicle_use_case
from app.modules.vehicle.domain.entities.vehicle_command_model import VehicleCreateModel
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel
from app.modules.vehicle.domain.usecases.create_vehicle import CreateVehicleUseCase
from app.modules.vehicle.presentation.schemas.vehicle_error_message import (
    ErrorMessageVehicleAlreadyExists,
)

router = APIRouter()


@router.post(
    "/",
    response_model=VehicleReadModel,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_409_CONFLICT: {"model": ErrorMessageVehicleAlreadyExists}},
)
def create_vehicle(
    data: VehicleCreateModel,
    response: Response,
    request: Request,
    create_vehicle_use_case: CreateVehicleUseCase = Depends(
        get_create_vehicle_use_case
    ),
):
    vehicle = create_vehicle_use_case((data,))
    response.headers["location"] = f"{request.url.path}{vehicle.id_}"
    return vehicle
