from fastapi import status, APIRouter
from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.presentation.schemas.auth_error_message import (
    ErrorMessageInvalidCredentials,
)


router = APIRouter()


@router.post(
    "/password-recovery/{email}",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_400_BAD_REQUEST: {"model": ErrorMessageInvalidCredentials}},
)
def password_recovery(email: str) -> AuthBaseModel:
    return email
