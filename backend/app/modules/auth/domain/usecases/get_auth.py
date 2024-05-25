from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.auth.domain.services.auth_service import AuthQueryService
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.services.user_query_service import UserQueryService


class GetAuthUseCase(BaseUseCase[None, Sequence[UserReadModel]]):
    service: UserQueryService

    @abstractmethod
    def __call__(self, **kwargs: None) -> Sequence[UserReadModel]:
        raise NotImplementedError()


class GetAuthUseCaseImpl(GetAuthUseCase):
    def __init__(self, service: AuthQueryService):
        self.service: AuthQueryService = service

    def __call__(self, **kwargs: None) -> Sequence[UserReadModel]:
        try:
            if all(value is None for value in kwargs.values()):
                users = self.service.findall()
            else:
                users = self.service.findall(**kwargs)
        except Exception:
            raise

        return users
