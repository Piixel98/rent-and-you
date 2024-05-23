"""
    Office Api Router
"""
from fastapi import Depends, status, APIRouter

from app.modules.office.dependencies import get_delete_office_use_case
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.usecases.delete_office import DeleteOfficeUseCase
from app.modules.office.presentation.schemas.office_error_message import (
    ErrorMessageOfficeNotFound,
)

router = APIRouter()


@router.delete(
    "/{id_}/",
    response_model=OfficeReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageOfficeNotFound}},
)
def delete_office(
    id_: int,
    delete_office_use_case: DeleteOfficeUseCase = Depends(get_delete_office_use_case),
):
    office = delete_office_use_case((id_,))
    return office
