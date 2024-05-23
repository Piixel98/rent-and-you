from typing import Sequence

from sqlalchemy.orm import Session
from sqlalchemy import select

from app.modules.rent.data.models.rent import Rent
from app.modules.rent.domain.entities.rent_query_model import RentReadModel
from app.modules.rent.domain.services.rent_query_service import RentQueryService


class RentQueryServiceImpl(RentQueryService):
    """
    RentQueryServiceImpl implements READ operations related to Rent entity using SQLALCHEMY
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> RentReadModel | None:
        result = self.session.get(Rent, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[RentReadModel | None]:
        statement = select(Rent).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [rent.to_read_model() for rent in result]

    def find_by_vehicle_id(self, vehicle_id: int) -> Sequence[RentReadModel | None]:
        statement = (
            select(Rent)
            .filter_by(vehicle_id=vehicle_id, is_deleted=False)
            .order_by(Rent.created_at.desc())
        )

        result = self.session.execute(statement).scalars().all()

        return [rent.to_read_model() for rent in result]
