from abc import abstractmethod
from typing import Sequence

from app.core.error.rent_exception import RentsNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.dependencies import get_settings
from app.modules.auth.domain.entities.auth_common_model import TokenPayload
from app.modules.auth.domain.repositories.auth_unit_of_work import AuthUnitOfWork
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.services.rent_query_service import RentQueryService


class GetUserRentsUseCase(BaseUseCase[TokenPayload, Sequence[RentReadModel]]):
    auth_unit_of_work: AuthUnitOfWork
    rent_query_service: RentQueryService

    @abstractmethod
    def __call__(self, args: TokenPayload) -> Sequence[RentReadModel]:
        raise NotImplementedError()


class GetUserRentsUseCaseImpl(GetUserRentsUseCase):
    def __init__(
        self, rent_query_service: RentQueryService, auth_unit_of_work: AuthUnitOfWork
    ):
        self.user_query_service: RentQueryService = rent_query_service
        self.auth_unit_of_work = auth_unit_of_work
        self.__setings = get_settings()

    def __call__(self, args: TokenPayload) -> Sequence[RentReadModel]:
        id = args.sub
        rents: Sequence[RentReadModel] = self.user_query_service.findall(
            user_id=int(id)
        )

        if len(rents) == 0:
            raise RentsNotFoundError

        return rents
