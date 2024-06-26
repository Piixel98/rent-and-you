from datetime import datetime

from fastapi import Depends, status, APIRouter

from app.modules.office.dependencies import get_office_vehicles_available_use_case
from app.modules.office.domain.usecases.get_office_vehicles_available import (
    GetOfficeVehiclesAvailableUseCaseImpl,
)
from app.modules.office.presentation.schemas.office_error_message import (
    ErrorMessageOfficeNotFound,
)
from app.modules.vehicle.domain.entities.vehicle_query_model import VehicleReadModel

router = APIRouter()


@router.get(
    "/{office_id}/vehicles/available/",
    response_model=list[VehicleReadModel],
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageOfficeNotFound}},
)
def get_office_vehicles_available(
    office_id: int,
    pickup_date: datetime = None,
    return_date: datetime = None,
    offset: int = 0,
    limit: int = 100,
    get_office_vehicles_available_use_case_: GetOfficeVehiclesAvailableUseCaseImpl = Depends(
        get_office_vehicles_available_use_case
    ),
):
    if pickup_date is None or return_date is None:
        vehicles = get_office_vehicles_available_use_case_.vehicle_service.findall(
            office_id=office_id
        )
    else:
        vehicles = get_office_vehicles_available_use_case_(
            office_id=office_id, pickup_date=pickup_date, return_date=return_date
        )
    return vehicles
