from fastapi import Depends, status, APIRouter

from app.modules.rent.dependencies import get_rent_use_case
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.usecases.get_rent import GetRentUseCase
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentNotFound,
)


router = APIRouter()


@router.get(
    "/{id_}/",
    response_model=RentReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRentNotFound}},
)
def get_rent(id_: int, get_rent_use_case_: GetRentUseCase = Depends(get_rent_use_case)):
    rent = get_rent_use_case_((id_,))
    return rent
