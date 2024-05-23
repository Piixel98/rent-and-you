from abc import abstractmethod
from typing import cast, Tuple

from app.core.use_cases.use_case import BaseUseCase
from app.modules.rent.domain.entities.rent_command_model import RentCreateModel
from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.repositories.rent_unit_of_work import RentUnitOfWork


class CreateRentUseCase(BaseUseCase[Tuple[RentCreateModel], RentReadModel]):
    unit_of_work: RentUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[RentCreateModel]) -> RentReadModel:
        raise NotImplementedError()


class CreateRentUseCaseImpl(CreateRentUseCase):
    def __init__(self, unit_of_work: RentUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[RentCreateModel]) -> RentReadModel:
        (data,) = args

        rent = RentEntity(id_=None, **data.dict())

        try:
            self.unit_of_work.repository.create(rent)
        except Exception as _e:
            self.unit_of_work.rollback()
            raise

        self.unit_of_work.commit()

        created_rent = self.unit_of_work.repository.findall()

        return RentReadModel.from_entity(cast(RentEntity, created_rent[-1]))
