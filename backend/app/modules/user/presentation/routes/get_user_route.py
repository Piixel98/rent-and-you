from fastapi import Depends, status, APIRouter

from app.modules.user.dependencies import get_user_use_case
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.usecases.get_user import GetUserUseCase
from app.modules.user.presentation.schemas.user_error_message import (
    ErrorMessageUserNotFound,
)


router = APIRouter()


@router.get(
    "/{id_}/",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageUserNotFound}},
)
def get_user(id_: int, get_user_use_case_: GetUserUseCase = Depends(get_user_use_case)):
    user = get_user_use_case_((id_,))
    return user
