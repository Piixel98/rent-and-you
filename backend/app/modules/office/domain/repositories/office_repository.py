from abc import abstractmethod

from app.core.repositories.base_repository import BaseRepository
from app.modules.office.domain.entities.office_entity import OfficeEntity


class OfficeRepository(BaseRepository[OfficeEntity]):
    """OfficeRepository defines a repositories interface for Office entity"""

    @abstractmethod
    def find_by_email(self, email: str) -> OfficeEntity | None:
        raise NotImplementedError()
