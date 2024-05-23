from abc import abstractmethod
from typing import Sequence

from app.core.repositories.base_repository import BaseRepository
from app.modules.rent.domain.entities.rent_entity import RentEntity


class RentRepository(BaseRepository[RentEntity]):
    """RentRepository defines a repositories interface for Rent entity"""

    @abstractmethod
    def find_by_vehicle_id(self, vehicle_id: str) -> Sequence[RentEntity | None]:
        raise NotImplementedError()
