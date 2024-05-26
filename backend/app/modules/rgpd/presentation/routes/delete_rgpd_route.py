"""
    RGPD Api Router
"""
from fastapi import Depends, status, APIRouter

from app.modules.rgpd.dependencies import get_delete_rgpd_use_case
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.usecases.delete_rgpd import DeleteRGPDUseCase
from app.modules.rgpd.presentation.schemas.rgpd_error_message import (
    ErrorMessageRGPDNotFound,
)


router = APIRouter()


@router.delete(
    "/{id_}/",
    response_model=RGPDReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRGPDNotFound}},
)
def delete_rgpd(
    id_: int,
    delete_rgpd_use_case: DeleteRGPDUseCase = Depends(get_delete_rgpd_use_case),
):
    rgpd = delete_rgpd_use_case((id_,))
    return rgpd
