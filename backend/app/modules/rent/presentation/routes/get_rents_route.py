from fastapi import Depends, status, APIRouter

from app.modules.rent.dependencies import get_rents_use_case
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.usecases.get_rents import GetRentsUseCase
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentNotFound,
)


router = APIRouter()


@router.get(
    "/",
    response_model=list[RentReadModel],
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRentNotFound}},
)
def get_rents(
    user_id: int = None,
    offset: int = 0,
    limit: int = 100,
    get_rents_use_case_: GetRentsUseCase = Depends(get_rents_use_case),
):
    rent = get_rents_use_case_(user_id=user_id)
    return rent
