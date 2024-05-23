from fastapi import Depends, status, APIRouter

from app.modules.office.dependencies import get_offices_use_case
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.usecases.get_offices import GetOfficesUseCase

router = APIRouter()


@router.get("/", response_model=list[OfficeReadModel], status_code=status.HTTP_200_OK)
def get_offices(
    city: str = None,
    offset: int = 0,
    limit: int = 100,
    get_offices_use_case_: GetOfficesUseCase = Depends(get_offices_use_case),
):
    offices = get_offices_use_case_(city=city)
    return offices
