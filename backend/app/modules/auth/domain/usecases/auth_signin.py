from abc import abstractmethod
from datetime import timedelta, datetime
from typing import Sequence, cast

from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt

from app.core.auth import verify_password
from app.core.error.auth_exception import InvalidCredentialsError
from app.core.use_cases.use_case import BaseUseCase
from app.dependencies import get_settings
from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.domain.entities.auth_entity import AuthEntity
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.services.user_query_service import UserQueryService


class AuthSignInUseCase(BaseUseCase[OAuth2PasswordRequestForm, AuthBaseModel]):
    auth_unit_of_work: AuthUnitOfWork
    user_query_service: UserQueryService

    @abstractmethod
    def __call__(self, args: OAuth2PasswordRequestForm) -> AuthBaseModel:
        raise NotImplementedError()


class AuthSignInUseCaseImpl(AuthSignInUseCase):
    def __init__(
        self, user_query_service: UserQueryService, auth_unit_of_work: AuthUnitOfWork
    ):
        self.user_query_service: UserQueryService = user_query_service
        self.auth_unit_of_work = auth_unit_of_work
        self.__setings = get_settings()

    def __call__(self, args: OAuth2PasswordRequestForm) -> AuthBaseModel:
        email = args.username
        password = args.password

        user: Sequence[UserReadModel] = self.user_query_service.findall(email=email)

        if len(user) == 0:
            raise InvalidCredentialsError

        same_password = verify_password(
            plain_password=password, hashed_password=user[0].hashed_password
        )
        if not same_password:
            raise InvalidCredentialsError

        expires_in = timedelta(minutes=self.__setings.ACCESS_TOKEN_EXPIRE_MINUTES)
        expire = datetime.utcnow() + expires_in
        to_encode = {
            "exp": expire,
            "sub": str(user[0].id_),
            "admin": True if user[0].role == "admin" else False,
        }
        encoded_jwt = jwt.encode(
            to_encode, self.__setings.SECRET_KEY, algorithm="HS256"
        )

        token_entity = AuthEntity(
            id_=None,
            access_token=encoded_jwt,
            expires_in=int(expires_in.total_seconds()),
            token_type="bearer",
            user_id=user[0].id_,
        )

        try:
            self.auth_unit_of_work.repository.create(token_entity)
        except Exception as _e:
            self.auth_unit_of_work.rollback()
            raise

        self.auth_unit_of_work.commit()

        return AuthBaseModel.from_entity(cast(AuthEntity, token_entity))
