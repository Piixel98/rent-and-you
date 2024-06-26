from fastapi import Depends, status, APIRouter

from app.modules.rgpd.dependencies import get_rgpd_use_case
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.usecases.get_rgpd import GetRGPDUseCase
from app.modules.rgpd.presentation.schemas.rgpd_error_message import (
    ErrorMessageRGPDNotFound,
)


router = APIRouter()


@router.get(
    "/{id_}/",
    response_model=RGPDReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRGPDNotFound}},
)
def get_rgpd(id_: int, get_rgpd_use_case_: GetRGPDUseCase = Depends(get_rgpd_use_case)):
    rgpd = get_rgpd_use_case_((id_,))
    return rgpd
