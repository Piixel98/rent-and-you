from fastapi import Depends, status, APIRouter

from app.modules.rgpd.dependencies import get_rgpds_use_case
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.usecases.get_rgpds import GetRGPDsUseCase


router = APIRouter()


@router.get("/", response_model=list[RGPDReadModel], status_code=status.HTTP_200_OK)
def get_rgpds(
    user_id: str = None,
    offset: int = 0,
    limit: int = 100,
    get_rgpds_use_case_: GetRGPDsUseCase = Depends(get_rgpds_use_case),
):
    rgpds = get_rgpds_use_case_(user_id=user_id)
    return rgpds
