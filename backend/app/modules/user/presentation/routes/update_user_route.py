from fastapi import Depends, status, APIRouter

from app.modules.user.dependencies import get_update_user_use_case
from app.modules.user.domain.entities.user_command_model import UserUpdateModel
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.usecases.update_user import UpdateUserUseCase
from app.modules.user.presentation.schemas.user_error_message import (
    ErrorMessageUserNotFound,
)


router = APIRouter()


@router.patch(
    "/{id_}/",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageUserNotFound}},
)
async def update_user(
    id_: int,
    data: UserUpdateModel,
    update_user_use_case: UpdateUserUseCase = Depends(get_update_user_use_case),
):
    user = update_user_use_case((id_, data))
    return user
