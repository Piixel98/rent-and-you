from fastapi import status, APIRouter, Depends

from app.core.auth import get_current_active_user
from app.modules.auth.dependencies import get_user_me_use_case
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.usecases.get_user_me import GetUserMeUseCase
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageAccessTokenNotProvided,
)
from app.modules.user.domain.entities.user_query_model import UserReadModel

router = APIRouter()


@router.get(
    "/user",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageAccessTokenNotProvided}
    },
)
def get_user_me(
    get_user: TokenPayload = Depends(get_current_active_user),
    get_user_use_case_: GetUserMeUseCase = Depends(get_user_me_use_case),
) -> UserReadModel:
    return get_user_use_case_(get_user)
