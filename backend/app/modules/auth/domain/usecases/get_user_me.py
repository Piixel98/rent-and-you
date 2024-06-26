from abc import abstractmethod


from app.core.error.auth_exception import InvalidCredentialsError
from app.core.use_cases.use_case import BaseUseCase
from app.dependencies import get_settings
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.services.user_query_service import UserQueryService


class GetUserMeUseCase(BaseUseCase[TokenPayload, UserReadModel]):
    auth_unit_of_work: AuthUnitOfWork
    user_query_service: UserQueryService

    @abstractmethod
    def __call__(self, args: TokenPayload) -> UserReadModel:
        raise NotImplementedError()


class GetUserMeUseCaseImpl(GetUserMeUseCase):
    def __init__(
        self, user_query_service: UserQueryService, auth_unit_of_work: AuthUnitOfWork
    ):
        self.user_query_service: UserQueryService = user_query_service
        self.auth_unit_of_work = auth_unit_of_work
        self.__setings = get_settings()

    def __call__(self, args: TokenPayload) -> UserReadModel:
        id = args.sub
        user: UserReadModel = self.user_query_service.find_by_id(id_=int(id))

        if user is None:
            raise InvalidCredentialsError

        return user
