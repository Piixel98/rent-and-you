from abc import abstractmethod
from typing import cast, Tuple

from app.core.error.rgpd_exception import RGPDAlreadyExistsError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.rgpd.domain.entities.rgpd_command_model import RGPDCreateModel
from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel
from app.modules.rgpd.domain.repositories.rgpd_unit_of_work import RGPDUnitOfWork


class CreateRGPDUseCase(BaseUseCase[Tuple[RGPDCreateModel], RGPDReadModel]):
    unit_of_work: RGPDUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[RGPDCreateModel]) -> RGPDReadModel:
        raise NotImplementedError()


class CreateRGPDUseCaseImpl(CreateRGPDUseCase):
    def __init__(self, unit_of_work: RGPDUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[RGPDCreateModel]) -> RGPDReadModel:
        (data,) = args

        rgpd = RGPDEntity(id_=None, **data.dict())
        rgpd.hashed_password = rgpd.password_to_hash(data.hashed_password)

        existing_rgpd = self.unit_of_work.repository.findall(
            document_id=data.document_id
        )
        if len(existing_rgpd) > 0:
            raise RGPDAlreadyExistsError

        try:
            self.unit_of_work.repository.create(rgpd)
        except Exception as _e:
            self.unit_of_work.rollback()
            raise

        self.unit_of_work.commit()

        created_rgpd = self.unit_of_work.repository.findall(
            document_id=data.document_id
        )

        return RGPDReadModel.from_entity(cast(RGPDEntity, created_rgpd[0]))
