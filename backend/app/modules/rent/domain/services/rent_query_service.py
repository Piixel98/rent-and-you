from abc import abstractmethod
from typing import Sequence

from app.core.services.base_query_service import QueryService, _T
from app.modules.rent.domain.entities.rent_query_model import RentReadModel


class RentQueryService(QueryService[RentReadModel]):
    """ """

    @abstractmethod
    def find_by_vehicle_id(self, vehicle_id: int) -> Sequence[_T | None]:
        raise NotImplementedError()
