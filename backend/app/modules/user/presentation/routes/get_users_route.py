from fastapi import Depends, status, APIRouter

from app.modules.user.dependencies import get_users_use_case
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.usecases.get_users import GetUsersUseCase


router = APIRouter()


@router.get("/", response_model=list[UserReadModel], status_code=status.HTTP_200_OK)
def get_users(
    email: str = None,
    offset: int = 0,
    limit: int = 100,
    get_users_use_case_: GetUsersUseCase = Depends(get_users_use_case),
):
    users = get_users_use_case_(email=email)
    return users
