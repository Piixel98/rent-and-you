from abc import abstractmethod
from typing import Tuple

from app.core.use_cases.use_case import BaseUseCase
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.services.office_query_service import OfficeQueryService
from app.core.error.office_exception import OfficeNotFoundError


class GetOfficeUseCase(BaseUseCase[Tuple[int], OfficeReadModel]):
    """
    GetOfficeUseCase defines a query use case interface related Office Entity
    """

    service: OfficeQueryService

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> OfficeReadModel:
        raise NotImplementedError()


class GetOfficeUseCaseImpl(GetOfficeUseCase):
    """
    GetOfficeUseCaseImpl implements a query use cases related to Office entity
    """

    def __init__(self, service: OfficeQueryService):
        self.service: OfficeQueryService = service

    def __call__(self, args: Tuple[int]) -> OfficeReadModel:
        (id_,) = args

        try:
            office = self.service.find_by_id(id_)
            if office is None:
                raise OfficeNotFoundError()
        except Exception:
            raise

        return office
