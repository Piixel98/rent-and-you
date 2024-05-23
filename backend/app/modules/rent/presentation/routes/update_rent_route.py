from fastapi import Depends, status, APIRouter

from app.modules.rent.dependencies import get_update_rent_use_case
from app.modules.rent.domain.entities.rent_command_model import RentUpdateModel
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.usecases.update_rent import UpdateRentUseCase
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentNotFound,
)


router = APIRouter()


@router.patch(
    "/{id_}/",
    response_model=RentReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRentNotFound}},
)
async def update_rent(
    id_: int,
    data: RentUpdateModel,
    update_rent_use_case: UpdateRentUseCase = Depends(get_update_rent_use_case),
):
    rent = update_rent_use_case((id_, data))
    return rent
