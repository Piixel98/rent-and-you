from abc import abstractmethod
from typing import Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.services.rgpd_query_service import RGPDQueryService


class GetRGPDsUseCase(BaseUseCase[None, Sequence[RGPDReadModel]]):
    service: RGPDQueryService

    @abstractmethod
    def __call__(self, **kwargs: None) -> Sequence[RGPDReadModel]:
        raise NotImplementedError()


class GetRGPDsUseCaseImpl(GetRGPDsUseCase):
    def __init__(self, service: RGPDQueryService):
        self.service: RGPDQueryService = service

    def __call__(self, **kwargs: None) -> Sequence[RGPDReadModel]:
        try:
            if all(value is None for value in kwargs.values()):
                rgpds = self.service.findall()
            else:
                rgpds = self.service.findall(**kwargs)
        except Exception:
            raise

        return rgpds
