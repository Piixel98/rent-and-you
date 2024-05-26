from abc import abstractmethod
from typing import cast, Tuple, Optional

from app.core.error.rgpd_exception import RGPDNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDUpdateModel
from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork


class UpdateRGPDUseCase(BaseUseCase[Tuple[int, RGPDUpdateModel], RGPDReadModel]):
    unit_of_work: RGPDUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int, RGPDUpdateModel]) -> RGPDReadModel:
        raise NotImplementedError()


class UpdateRGPDUseCaseImpl(UpdateRGPDUseCase):
    def __init__(self, unit_of_work: RGPDUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[int, RGPDUpdateModel]) -> RGPDReadModel:
        id_, update_data = args

        existing_rgpd: Optional[RGPDEntity] = self.unit_of_work.repository.find_by_id(
            id_
        )

        if existing_rgpd is None:
            raise RGPDNotFoundError

        update_entity = existing_rgpd.update_entity(
            update_data, lambda rgpd_data: update_data.dict(exclude_unset=True)
        )

        try:
            updated_rgpd = self.unit_of_work.repository.update(update_entity)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return RGPDReadModel.from_entity(cast(RGPDEntity, updated_rgpd))
