from fastapi import Depends, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.domain.usecases.login_access_token import LoginAccessTokenUseCase
from app.modules.auth.dependencies import login_access_token_use_case
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageInvalidCredentials,
)

router = APIRouter()


@router.post(
    "/login/access-token",
    response_model=AuthBaseModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageInvalidCredentials}},
)
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    login_access_token_use_case_: LoginAccessTokenUseCase = Depends(
        login_access_token_use_case
    ),
) -> AuthBaseModel:
    token = login_access_token_use_case_(form_data)
    return token
