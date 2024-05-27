from fastapi import Depends, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.domain.usecases.auth_signin import AuthSignInUseCase
from app.modules.auth.dependencies import auth_signin_use_case
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageInvalidCredentials,
)

router = APIRouter()


@router.post(
    "/signin",
    response_model=AuthBaseModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageInvalidCredentials}},
)
def auth_signin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_signin_use_case_: AuthSignInUseCase = Depends(auth_signin_use_case),
) -> AuthBaseModel:
    return auth_signin_use_case_(form_data)
