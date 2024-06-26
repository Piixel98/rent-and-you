from fastapi import Depends, status, APIRouter

from app.modules.rgpd.dependencies import get_update_rgpd_use_case
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDUpdateModel
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.usecases.update_rgpd import UpdateRGPDUseCase
from app.modules.rgpd.presentation.schemas.rgpd_error_message import (
    ErrorMessageRGPDNotFound,
)


router = APIRouter()


@router.put(
    "/{id_}/",
    response_model=RGPDReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRGPDNotFound}},
)
async def update_rgpd(
    id_: int,
    data: RGPDUpdateModel,
    update_rgpd_use_case: UpdateRGPDUseCase = Depends(get_update_rgpd_use_case),
):
    rgpd = update_rgpd_use_case((id_, data))
    return rgpd
