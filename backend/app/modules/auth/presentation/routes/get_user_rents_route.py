from typing import Sequence

from fastapi import status, APIRouter, Depends

from app.core.auth import get_current_active_user
from app.modules.auth.dependencies import get_user_rents_use_case
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.usecases.get_user_rents import GetUserRentsUseCase
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageAccessTokenNotProvided,
)
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.presentation.schemas.rent_error_message import (
    ErrorMessageRentsNotFound,
)

router = APIRouter()


@router.get(
    "/user/rents",
    response_model=list[RentReadModel],
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageAccessTokenNotProvided},
        status.HTTP_404_NOT_FOUND: {"model": ErrorMessageRentsNotFound},
    },
)
def get_user_rents(
    get_user: TokenPayload = Depends(get_current_active_user),
    get_user_rents_use_case_: GetUserRentsUseCase = Depends(get_user_rents_use_case),
) -> Sequence[RentReadModel]:
    return get_user_rents_use_case_(get_user)
