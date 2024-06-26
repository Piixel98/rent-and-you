"""
    Rent Api Router
"""
from fastapi import Depends, status, APIRouter

from app.modules.rent.dependencies import get_delete_rent_use_case
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.usecases.delete_rent import DeleteRentUseCase
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentNotFound,
)


router = APIRouter()


@router.delete(
    "/{id_}/",
    response_model=RentReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRentNotFound}},
)
def delete_rent(
    id_: int,
    delete_rent_use_case: DeleteRentUseCase = Depends(get_delete_rent_use_case),
):
    rent = delete_rent_use_case((id_,))
    return rent
