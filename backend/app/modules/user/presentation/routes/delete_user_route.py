"""
    User Api Router
"""
from fastapi import Depends, status, APIRouter

from app.modules.user.dependencies import get_delete_user_use_case
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.usecases.delete_user import DeleteUserUseCase
from app.modules.user.presentation.schemas.user_error_message import (
    ErrorMessageUserNotFound,
)


router = APIRouter()


@router.delete(
    "/{id_}/",
    response_model=UserReadModel,
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_404_NOT_FOUND: {"model": ErrorMessageUserNotFound}},
)
def delete_user(
    id_: int,
    delete_user_use_case: DeleteUserUseCase = Depends(get_delete_user_use_case),
):
    user = delete_user_use_case((id_,))
    return user
