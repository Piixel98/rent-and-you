from abc import abstractmethod
from typing import Tuple, Sequence

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.services.rent_query_service import RentQueryService


class GetRentsByVehicleUseCase(BaseUseCase[Tuple[int], RentReadModel]):
    """
    GetRentUseCase defines a query use case interface related Rent Entity
    """

    service: RentQueryService

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> Sequence[RentReadModel | None]:
        raise NotImplementedError()


class GetRentsByVehicleUseCaseImpl(GetRentsByVehicleUseCase):
    """
    GetRentUseCaseImpl implements a query use cases related to Rent entity
    """

    def __init__(self, service: RentQueryService):
        self.service: RentQueryService = service

    def __call__(self, args: Tuple[int]) -> Sequence[RentReadModel | None]:
        (vehicle_id,) = args

        try:
            rents = self.service.find_by_vehicle_id(vehicle_id)
        except Exception:
            raise

        return rents
