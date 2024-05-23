from fastapi import Depends, status, APIRouter

from app.modules.office.dependencies import get_update_office_use_case
from app.modules.office.domain.entities.office_command_model import OfficeUpdateModel
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.usecases.update_office import UpdateOfficeUseCase
from app.modules.office.presentation.schemas.office_error_message import (
    ErrorMessageOfficeNotFound,
)


router = APIRouter()


@router.patch(
    "/{id_}/",
    response_model=OfficeReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageOfficeNotFound}},
)
async def update_office(
    id_: int,
    data: OfficeUpdateModel,
    update_office_use_case: UpdateOfficeUseCase = Depends(get_update_office_use_case),
):
    office = update_office_use_case((id_, data))
    return office
