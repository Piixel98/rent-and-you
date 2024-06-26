from fastapi import Depends, status, Response, Request, APIRouter

from app.modules.office.dependencies import get_create_office_use_case
from app.modules.office.domain.entities.office_command_model import OfficeCreateModel
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.usecases.create_office import CreateOfficeUseCase
from app.modules.office.presentation.schemas.office_error_message import (
    ErrorMessageOfficeAlreadyExists,
)

router = APIRouter()


@router.post(
    "/",
    response_model=OfficeReadModel,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_409_CONFLICT: {"model": ErrorMessageOfficeAlreadyExists}},
)
def create_office(
    data: OfficeCreateModel,
    response: Response,
    request: Request,
    create_office_use_case: CreateOfficeUseCase = Depends(get_create_office_use_case),
):
    office = create_office_use_case((data,))
    response.headers["location"] = f"{request.url.path}{office.id_}"
    return office
