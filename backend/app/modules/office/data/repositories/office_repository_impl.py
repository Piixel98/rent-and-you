from typing import Sequence

from sqlalchemy import select, update, delete
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from app.modules.office.domain.entities.office_entity import OfficeEntity
from app.modules.office.data.models.office import Office
from app.modules.office.domain.repositories.office_repository import OfficeRepository


class OfficeRepositoryImpl(OfficeRepository):
    """
    OfficeRepositoryImpl implements CRUD operations related Office entity using SQLAlchemy
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_email(self, email: str) -> OfficeEntity | None:
        statement = select(Office).filter_by(email=email)

        try:
            result: Office = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def create(self, entity: OfficeEntity) -> OfficeEntity:
        office = Office.from_entity(entity)

        self.session.add(office)

        return office.to_entity()

    def findall(self, **kwargs) -> Sequence[OfficeEntity]:
        query = self.session.query(Office)

        for key, value in kwargs.items():
            query = query.filter(getattr(Office, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> OfficeEntity | None:
        result: Office | None = self.session.get(Office, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: OfficeEntity) -> OfficeEntity:
        office = Office.from_entity(entity)
        update_data = office.to_dict()

        for key in [Office.updated_at.key, Office.created_at.key, Office.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(Office)
            .where(Office.id_ == office.id_)
            .values(update_data)
            .returning(Office)
        )

        office_mapping = self.session.execute(statement).mappings().one()
        result = Office(**office_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> OfficeEntity:
        statement = (
            delete(Office).filter_by(id_=id_).returning(*Office.__table__.columns)
        )

        result: Office = self.session.execute(statement).scalar_one()

        return result.to_entity()
