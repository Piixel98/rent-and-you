from fastapi import Depends, status, Response, Request, APIRouter

from app.modules.rgpd.dependencies import get_create_rgpd_use_case
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDCreateModel
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.usecases.create_rgpd import CreateRGPDUseCase
from app.modules.rgpd.presentation.schemas.rgpd_error_message import (
    ErrorMessageRGPDAlreadyExists,
)


router = APIRouter()


@router.post(
    "/",
    response_model=RGPDReadModel,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_409_CONFLICT: {"model": ErrorMessageRGPDAlreadyExists}},
)
def create_rgpd(
    data: RGPDCreateModel,
    response: Response,
    request: Request,
    create_rgpd_use_case: CreateRGPDUseCase = Depends(get_create_rgpd_use_case),
):
    rgpd = create_rgpd_use_case(data)
    response.headers["location"] = f"{request.url.path}{rgpd.id_}"
    return rgpd
