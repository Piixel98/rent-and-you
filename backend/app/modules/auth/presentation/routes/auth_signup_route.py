from fastapi import Depends, status, APIRouter
from starlette.requests import Request
from starlette.responses import Response

from app.modules.user.dependencies import get_create_user_use_case
from app.modules.user.domain.entities.user_command_model import UserCreateModel
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.usecases.create_user import CreateUserUseCase
from app.modules.user.presentation.schemas.user_error_message import (
    ErrorMessageUserAlreadyExists,
)

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserReadModel,
    status_code=status.HTTP_201_CREATED,
    responses={status.HTTP_409_CONFLICT: {"model": ErrorMessageUserAlreadyExists}},
)
def auth_signup(
    data: UserCreateModel,
    response: Response,
    request: Request,
    create_user_use_case: CreateUserUseCase = Depends(get_create_user_use_case),
):
    user = create_user_use_case(data)
    response.headers["location"] = f"{request.url.path}{user.id_}"
    return user
