from typing import Sequence

from sqlalchemy import select, update, delete
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.data.models.rgpd import RGPD
from app.modules.rgpd.domain.repositories.rgpd_repository import RGPDRepository


class RGPDRepositoryImpl(RGPDRepository):
    """
    RGPDRepositoryImpl implements CRUD operations related RGPD entity using SQLAlchemy
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_email(self, email: str) -> RGPDEntity | None:
        statement = select(RGPD).filter_by(email=email)

        try:
            result: RGPD = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def find_by_document_id(self, document_id: str) -> RGPDEntity | None:
        statement = select(RGPD).filter_by(document_id=document_id)

        try:
            result: RGPD = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def create(self, entity: RGPDEntity) -> RGPDEntity:
        rgpd = RGPD.from_entity(entity)

        self.session.add(rgpd)

        return rgpd.to_entity()

    def findall(self, **kwargs) -> Sequence[RGPDEntity]:
        query = self.session.query(RGPD)

        for key, value in kwargs.items():
            query = query.filter(getattr(RGPD, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> RGPDEntity | None:
        result: RGPD | None = self.session.get(RGPD, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: RGPDEntity) -> RGPDEntity:
        rgpd = RGPD.from_entity(entity)
        update_data = rgpd.to_dict()

        for key in [RGPD.updated_at.key, RGPD.created_at.key, RGPD.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(RGPD).where(RGPD.id_ == rgpd.id_).values(update_data).returning(RGPD)
        )

        user_mapping = self.session.execute(statement).mappings().one()
        result = RGPD(**user_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> RGPDEntity:
        statement = delete(RGPD).filter_by(id_=id_).returning(*RGPD.__table__.columns)

        result: RGPD = self.session.execute(statement).scalar_one()

        return result.to_entity()
