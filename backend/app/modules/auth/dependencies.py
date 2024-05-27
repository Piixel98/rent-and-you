from fastapi import Depends
from sqlalchemy.orm import Session

from app.modules.auth.data.repositories.auth_repository_impl import AuthRepositoryImpl
from app.modules.auth.data.repositories.auth_unit_of_work_impl import AuthUnitOfWorkImpl
from app.modules.auth.data.services.auth_query_service_impl import AuthQueryServiceImpl
from app.modules.auth.domain.repositories.auth_repository import AuthRepository
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.auth.domain.services.auth_query_service import AuthQueryService
from app.modules.auth.domain.usecases.auth_signin import (
    AuthSignInUseCase,
    AuthSignInUseCaseImpl,
)
from app.modules.auth.domain.usecases.get_user_me import (
    GetUserMeUseCase,
    GetUserMeUseCaseImpl,
)
from app.modules.auth.domain.usecases.get_user_rents import GetUserRentsUseCaseImpl
from app.modules.auth.domain.usecases.update_user_me import (
    UpdateUserMeUseCase,
    UpdateUserMeUseCaseImpl,
)
from app.modules.rent.dependencies import get_rent_query_service
from app.modules.rent.domain.services.rent_query_service import RentQueryService
from app.modules.user.dependencies import get_user_query_service, get_user_unit_of_work
from app.modules.user.domain.repositories.user_unit_of_work import UserUnitOfWork
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


def auth_signin_use_case(
    user_query_service: UserQueryService = Depends(get_user_query_service),
    unit_of_work: AuthUnitOfWork = Depends(get_auth_unit_of_work),
) -> AuthSignInUseCase:
    return AuthSignInUseCaseImpl(
        user_query_service=user_query_service, auth_unit_of_work=unit_of_work
    )


def get_user_me_use_case(
    user_query_service: UserQueryService = Depends(get_user_query_service),
    unit_of_work: AuthUnitOfWork = Depends(get_auth_unit_of_work),
) -> GetUserMeUseCase:
    return GetUserMeUseCaseImpl(
        user_query_service=user_query_service,
        auth_unit_of_work=unit_of_work,
    )


def update_user_me_use_case(
    user_unit_of_work: UserUnitOfWork = Depends(get_user_unit_of_work),
    auth_unit_of_work: AuthUnitOfWork = Depends(get_auth_unit_of_work),
) -> UpdateUserMeUseCase:
    return UpdateUserMeUseCaseImpl(
        auth_unit_of_work=auth_unit_of_work, user_unit_of_work=user_unit_of_work
    )


def get_user_rents_use_case(
    rent_query_service: RentQueryService = Depends(get_rent_query_service),
    unit_of_work: AuthUnitOfWork = Depends(get_auth_unit_of_work),
) -> GetUserMeUseCase:
    return GetUserRentsUseCaseImpl(
        rent_query_service=rent_query_service,
        auth_unit_of_work=unit_of_work,
    )
