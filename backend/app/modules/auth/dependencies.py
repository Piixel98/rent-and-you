from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.auth.data.repositories.auth_repository_impl import AuthRepositoryImpl
from app.modules.auth.data.repositories.auth_unit_of_work_impl import AuthUnitOfWorkImpl
from app.modules.auth.data.services.auth_query_service_impl import AuthQueryServiceImpl
from app.modules.auth.domain.repositories.auth_repository import AuthRepository
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.auth.domain.services.auth_service import AuthQueryService
from app.modules.auth.domain.usecases.login_access_token import (
    LoginAccessTokenUseCase,
    LoginAccessTokenUseCaseImpl,
)
from app.modules.user.dependencies import get_user_query_service
from app.modules.user.domain.services.user_query_service import UserQueryService

from app.modules.user.domain.usecases.get_users import (
    GetUsersUseCaseImpl,
    GetUsersUseCase,
)

from app.core.database.postgres.database import get_session


def get_auth_query_service(session: Session = Depends(get_session)) -> AuthQueryService:
    return AuthQueryServiceImpl(session)


def get_auth_repository(session: Session = Depends(get_session)) -> AuthRepository:
    return AuthRepositoryImpl(session)


def get_auth_unit_of_work(
    session: Session = Depends(get_session),
    auth_repository: AuthRepository = Depends(get_auth_repository),
) -> AuthUnitOfWork:
    return AuthUnitOfWorkImpl(session, auth_repository)


def get_users_use_case(
    user_query_service: UserQueryService = Depends(get_user_query_service),
) -> GetUsersUseCase:
    return GetUsersUseCaseImpl(user_query_service)


def login_access_token_use_case(
    user_query_service: UserQueryService = Depends(get_user_query_service),
    unit_of_work: AuthUnitOfWork = Depends(get_auth_unit_of_work),
) -> LoginAccessTokenUseCase:
    return LoginAccessTokenUseCaseImpl(
        user_query_service=user_query_service, auth_unit_of_work=unit_of_work
    )
