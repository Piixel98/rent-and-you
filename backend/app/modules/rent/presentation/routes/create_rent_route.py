from fastapi import Depends, status, Response, Request, APIRouter

from app.modules.rent.dependencies import get_create_rent_use_case
from app.modules.rent.domain.entities.rent_command_model import RentCreateModel
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.usecases.create_rent import CreateRentUseCase
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentAlreadyExists,
)

router = APIRouter()


@router.post(
    "/",
    response_model=RentReadModel,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_409_CONFLICT: {"model": ErrorMessageRentAlreadyExists}},
)
def create_rent(
    data: RentCreateModel,
    response: Response,
    request: Request,
    create_rent_use_case: CreateRentUseCase = Depends(get_create_rent_use_case),
):
    rent = create_rent_use_case((data,))
    response.headers["location"] = f"{request.url.path}{rent.id_}"
    return rent
