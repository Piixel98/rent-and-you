from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.rgpd_exception import RGPDNotFoundError
from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork
from app.core.use_cases.use_case import BaseUseCase


class DeleteRGPDUseCase(BaseUseCase[Tuple[int], RGPDReadModel]):
    """
    RGPDCommandUseCase defines a command use case interface related RGPD entity
    """

    unit_of_work: RGPDUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int]) -> RGPDReadModel:
        raise NotImplementedError()


class DeleteRGPDUseCaseImpl(DeleteRGPDUseCase):
    """
    RGPDCommandUseCaseImpl implements a command use cases related to the RGPD entity
    """

    def __init__(self, unit_of_work: RGPDUnitOfWork):
        self.unit_of_work: RGPDUnitOfWork = unit_of_work

    def __call__(self, args: Tuple[int]) -> RGPDReadModel:
        (id_,) = args
        existing_rgpd = self.unit_of_work.repository.find_by_id(id_)

        if existing_rgpd is None:
            raise RGPDNotFoundError()

        marked_rgpd = existing_rgpd.mark_entity_as_deleted()

        try:
            deleted_rgpd = self.unit_of_work.repository.update(marked_rgpd)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return RGPDReadModel.from_entity(cast(RGPDEntity, deleted_rgpd))
