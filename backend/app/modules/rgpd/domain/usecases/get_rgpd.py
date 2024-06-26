from abc import abstractmethod
from typing import Tuple

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.services.rgpd_query_service import RGPDQueryService
from app.core.error.rgpd_exception import RGPDNotFoundError


class GetRGPDUseCase(BaseUseCase[Tuple[int], RGPDReadModel]):
    """
    GetRGPDUseCase defines a query use case interface related RGPD Entity
    """

    service: RGPDQueryService

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> RGPDReadModel:
        raise NotImplementedError()


class GetRGPDUseCaseImpl(GetRGPDUseCase):
    """
    GetRGPDUseCaseImpl implements a query use cases related to RGPD entity
    """

    def __init__(self, service: RGPDQueryService):
        self.service: RGPDQueryService = service

    def __call__(self, args: Tuple[int]) -> RGPDReadModel:
        (id_,) = args

        try:
            rgpd = self.service.find_by_id(id_)
            if rgpd is None:
                raise RGPDNotFoundError()
        except Exception:
            raise

        return rgpd
