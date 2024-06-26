from abc import abstractmethod
from typing import Tuple

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.services.rent_query_service import RentQueryService
from app.core.error.rent_exception import RentNotFoundError


class GetRentUseCase(BaseUseCase[Tuple[int], RentReadModel]):
    """
    GetRentUseCase defines a query use case interface related Rent Entity
    """

    service: RentQueryService

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> RentReadModel:
        raise NotImplementedError()


class GetRentUseCaseImpl(GetRentUseCase):
    """
    GetRentUseCaseImpl implements a query use cases related to Rent entity
    """

    def __init__(self, service: RentQueryService):
        self.service: RentQueryService = service

    def __call__(self, args: Tuple[int]) -> RentReadModel:
        (id_,) = args

        try:
            rent = self.service.find_by_id(id_)
            if rent is None:
                raise RentNotFoundError()
        except Exception:
            raise

        return rent
