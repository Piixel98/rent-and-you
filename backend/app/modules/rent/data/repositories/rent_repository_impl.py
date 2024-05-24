from typing import Sequence

from sqlalchemy import update, delete
from sqlalchemy.orm import Session

from app.modules.rent.domain.entities.rent_entity import RentEntity
from app.modules.rent.data.models.rent import Rent
from app.modules.rent.domain.repositories.rent_repository import RentRepository


class RentRepositoryImpl(RentRepository):
    """
    RentRepositoryImpl implements CRUD operations related Rent entity using SQLAlchemy
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def create(self, entity: RentEntity) -> RentEntity:
        rent = Rent.from_entity(entity)

        self.session.add(rent)

        return rent.to_entity()

    def findall(self, **kwargs) -> Sequence[RentEntity]:
        query = self.session.query(Rent)

        for key, value in kwargs.items():
            query = query.filter(getattr(Rent, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> RentEntity | None:
        result: Rent | None = self.session.get(Rent, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: RentEntity) -> RentEntity:
        rent = Rent.from_entity(entity)
        update_data = rent.to_dict()

        for key in [Rent.updated_at.key, Rent.created_at.key, Rent.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(Rent).where(Rent.id_ == rent.id_).values(update_data).returning(Rent)
        )

        rent_mapping = self.session.execute(statement).mappings().one()
        result = Rent(**rent_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> RentEntity:
        statement = delete(Rent).filter_by(id_=id_).returning(*Rent.__table__.columns)

        result: Rent = self.session.execute(statement).scalar_one()

        return result.to_entity()
