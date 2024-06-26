from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.rent_exception import RentNotFoundError
from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.repositories.rent_unit_of_work import RentUnitOfWork
from app.core.use_cases.use_case import BaseUseCase


class DeleteRentUseCase(BaseUseCase[Tuple[int], RentReadModel]):
    """
    RentCommandUseCase defines a command use case interface related Rent entity
    """

    unit_of_work: RentUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> RentReadModel:
        raise NotImplementedError()


class DeleteRentUseCaseImpl(DeleteRentUseCase):
    """
    RentCommandUseCaseImpl implements a command use cases related to the Rent entity
    """

    def __init__(self, unit_of_work: RentUnitOfWork):
        self.unit_of_work: RentUnitOfWork = unit_of_work

    def __call__(self, args: Tuple[int]) -> RentReadModel:
        (id_,) = args
        existing_rent = self.unit_of_work.repository.find_by_id(id_)

        if existing_rent is None:
            raise RentNotFoundError()

        marked_rent = existing_rent.mark_entity_as_deleted()

        try:
            deleted_rent = self.unit_of_work.repository.update(marked_rent)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return RentReadModel.from_entity(cast(RentEntity, deleted_rent))
