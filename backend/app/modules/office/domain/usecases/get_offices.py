from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.services.office_query_service import OfficeQueryService


class GetOfficesUseCase(BaseUseCase[None, Sequence[OfficeReadModel]]):
    service: OfficeQueryService

    @abstractmethod
    def __call__(self, **kwargs: None) -> Sequence[OfficeReadModel]:
        raise NotImplementedError()


class GetOfficesUseCaseImpl(GetOfficesUseCase):
    def __init__(self, service: OfficeQueryService):
        self.service: OfficeQueryService = service

    def __call__(self, **kwargs) -> Sequence[OfficeReadModel]:
        try:
            if all(value is None for value in kwargs.values()):
                offices = self.service.findall()
            else:
                offices = self.service.findall(**kwargs)
        except Exception:
            raise

        return offices
