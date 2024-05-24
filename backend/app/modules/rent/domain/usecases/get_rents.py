from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.services.rent_query_service import RentQueryService


class GetRentsUseCase(BaseUseCase[None, Sequence[RentReadModel]]):
    service: RentQueryService

    @abstractmethod
    def __call__(self, **kwargs: None) -> Sequence[RentReadModel]:
        raise NotImplementedError()


class GetRentsUseCaseImpl(GetRentsUseCase):
    def __init__(self, service: RentQueryService):
        self.service: RentQueryService = service

    def __call__(self, **kwargs) -> Sequence[RentReadModel]:
        try:
            if all(value is None for value in kwargs.values()):
                rents = self.service.findall()
            else:
                rents = self.service.findall(**kwargs)
        except Exception:
            raise

        return rents
