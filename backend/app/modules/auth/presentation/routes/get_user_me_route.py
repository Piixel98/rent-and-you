from fastapi import Depends, status, APIRouter

from app.core.auth import CurrentUser
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageInvalidCredentials,
)
from app.modules.user.domain.entities.user_query_model import UserReadModel

router = APIRouter()


@router.get(
    "/user/me",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageInvalidCredentials}},
)
def get_user_me(current_user: CurrentUser = Depends()) -> UserReadModel:
    user = current_user
    return user
