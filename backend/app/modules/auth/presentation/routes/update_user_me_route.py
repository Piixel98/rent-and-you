from fastapi import status, APIRouter, Depends

from app.core.auth import get_current_active_user
from app.modules.auth.dependencies import update_user_me_use_case
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.usecases.update_user_me import UpdateUserMeUseCase
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageAccessTokenNotProvided,
)
from app.modules.user.domain.entities.user_command_model import UserUpdateModel
from app.modules.user.domain.entities.user_query_model import UserReadModel

router = APIRouter()


@router.patch(
    "/user",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageAccessTokenNotProvided}
    },
)
def update_user_me(
    data: UserUpdateModel,
    get_user: TokenPayload = Depends(get_current_active_user),
    update_user_use_case_: UpdateUserMeUseCase = Depends(update_user_me_use_case),
) -> UserReadModel:
    return update_user_use_case_(
        (
            get_user,
            data,
        )
    )
