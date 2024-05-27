from abc import abstractmethod
from typing import cast

from app.core.error.rgpd_exception import RGPDAlreadyExistsError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDCreateModel
from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork


class CreateRGPDUseCase(BaseUseCase[RGPDCreateModel, RGPDReadModel]):
    unit_of_work: RGPDUnitOfWork

    @abstractmethod
    def __call__(self, args: RGPDCreateModel) -> RGPDReadModel:
        raise NotImplementedError()


class CreateRGPDUseCaseImpl(CreateRGPDUseCase):
    def __init__(self, unit_of_work: RGPDUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: RGPDCreateModel) -> RGPDReadModel:
        data = args

        rgpd = RGPDEntity(
            id_=None,
            rgpd=data.rgpd,
            lssi=data.lssi,
            user_id=data.user_id,
        )

        try:
            self.unit_of_work.repository.create(entity=rgpd)
        except Exception as _e:
            self.unit_of_work.rollback()
            raise

        self.unit_of_work.commit()

        created_rgpd = self.unit_of_work.repository.findall()

        if not created_rgpd:
            raise RGPDAlreadyExistsError()

        return RGPDReadModel.from_entity(cast(RGPDEntity, created_rgpd[-1]))
