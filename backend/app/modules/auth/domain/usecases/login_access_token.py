from abc import abstractmethod
from datetime import timedelta
from typing import Sequence, cast

from fastapi.security import OAuth2PasswordRequestForm

from app.core.auth import create_access_token, verify_password
from app.core.error.auth_exception import InvalidCredentialsError
from app.core.use_cases.use_case import BaseUseCase
from app.dependencies import get_settings
from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.domain.entities.auth_entity import AuthEntity
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.services.user_query_service import UserQueryService


class LoginAccessTokenUseCase(BaseUseCase[OAuth2PasswordRequestForm, AuthBaseModel]):
    auth_unit_of_work: AuthUnitOfWork
    user_query_service: UserQueryService

    @abstractmethod
    def __call__(self, args: OAuth2PasswordRequestForm) -> AuthBaseModel:
        raise NotImplementedError()


class LoginAccessTokenUseCaseImpl(LoginAccessTokenUseCase):
    def __init__(
        self, user_query_service: UserQueryService, auth_unit_of_work: AuthUnitOfWork
    ):
        self.user_query_service: UserQueryService = user_query_service
        self.auth_unit_of_work = auth_unit_of_work

    def __call__(self, args: OAuth2PasswordRequestForm) -> AuthBaseModel:
        __settings = get_settings()
        email = args.username
        password = args.password

        user: Sequence[UserReadModel] = self.user_query_service.findall(email=email)

        if len(user) == 0:
            raise InvalidCredentialsError

        if user is None or not verify_password(
            plain_password=password, hashed_password=user[0].hashed_password
        ):
            raise InvalidCredentialsError

        expires_in = timedelta(minutes=__settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(subject=user[0].email, role=user[0].role)

        token_entity = AuthEntity(
            id_=None,
            access_token=access_token,
            expires_in=int(expires_in.total_seconds()),
            token_type="bearer",
        )

        try:
            self.auth_unit_of_work.repository.create(token_entity)
        except Exception as _e:
            self.auth_unit_of_work.rollback()
            raise

        self.auth_unit_of_work.commit()

        return AuthBaseModel.from_entity(cast(AuthEntity, token_entity))
