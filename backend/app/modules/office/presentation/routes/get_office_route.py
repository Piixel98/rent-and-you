from fastapi import Depends, status, APIRouter

from app.modules.office.dependencies import get_office_use_case
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.usecases.get_office import GetOfficeUseCase
from app.modules.office.presentation.schemas.office_error_message import (
    ErrorMessageOfficeNotFound,
)


router = APIRouter()


@router.get(
    "/{id_}/",
    response_model=OfficeReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageOfficeNotFound}},
)
def get_office(
    id_: int, get_office_use_case_: GetOfficeUseCase = Depends(get_office_use_case)
):
    office = get_office_use_case_((id_,))
    return office
