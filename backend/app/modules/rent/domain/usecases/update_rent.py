from abc import abstractmethod
from typing import cast, Tuple, Optional

from app.core.error.rent_exception import RentNotFoundError
from app.core.use_cases.use_case import BaseUseCase
from app.modules.rent.domain.entities.rent_command_model import RentUpdateModel
from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.repositories.rent_unit_of_work import RentUnitOfWork


class UpdateRentUseCase(BaseUseCase[Tuple[int, RentUpdateModel], RentReadModel]):
    unit_of_work: RentUnitOfWork

    @abstractmethod
    def __call__(self, args: Tuple[int, RentUpdateModel]) -> RentReadModel:
        raise NotImplementedError()


class UpdateRentUseCaseImpl(UpdateRentUseCase):
    def __init__(self, unit_of_work: RentUnitOfWork):
        self.unit_of_work = unit_of_work

    def __call__(self, args: Tuple[int, RentUpdateModel]) -> RentReadModel:
        id_, update_data = args

        existing_rent: Optional[RentEntity] = self.unit_of_work.repository.find_by_id(
            id_
        )

        if existing_rent is None:
            raise RentNotFoundError()

        update_entity = existing_rent.update_entity(
            update_data, lambda rent_data: update_data.dict(exclude_unset=True)
        )

        try:
            updated_rent = self.unit_of_work.repository.update(update_entity)
            self.unit_of_work.commit()
        except Exception:
            self.unit_of_work.rollback()
            raise

        return RentReadModel.from_entity(cast(RentEntity, updated_rent))
