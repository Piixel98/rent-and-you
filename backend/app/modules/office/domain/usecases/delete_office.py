from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.office_exception import OfficeNotFoundError
from app.modules.office.domain.entities.office_entity import OfficeEntity
from app.modules.office.domain.entities.office_query_model import OfficeReadModel
from app.modules.office.domain.repositories.office_unit_of_work import OfficeUnitOfWork
from app.core.use_cases.use_case import BaseUseCase


class DeleteOfficeUseCase(BaseUseCase[Tuple[int], OfficeReadModel]):
    """
    OfficeCommandUseCase defines a command use case interface related Office entity
    """

    unit_of_work: OfficeUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> OfficeReadModel:
        raise NotImplementedError()


class DeleteOfficeUseCaseImpl(DeleteOfficeUseCase):
    """
    OfficeCommandUseCaseImpl implements a command use cases related to the Office entity
    """

    def __init__(self, unit_of_work: OfficeUnitOfWork):
        self.unit_of_work: OfficeUnitOfWork = unit_of_work

    def __call__(self, args: Tuple[int]) -> OfficeReadModel:
        (id_,) = args
        existing_office = self.unit_of_work.repository.find_by_id(id_)

        if existing_office is None:
            raise OfficeNotFoundError()

        marked_office = existing_office.mark_entity_as_deleted()

        try:
            deleted_office = self.unit_of_work.repository.update(marked_office)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return OfficeReadModel.from_entity(cast(OfficeEntity, deleted_office))
