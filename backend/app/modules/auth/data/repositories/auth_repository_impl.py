from typing import Sequence

from sqlalchemy import update, delete
from sqlalchemy.orm import Session

from app.modules.auth.data.models.auth import Auth
from app.modules.auth.domain.entities.auth_entity import AuthEntity
from app.modules.auth.domain.repositories.auth_repository import AuthRepository


class AuthRepositoryImpl(AuthRepository):
    """
    UserRepositoryImpl implements CRUD operations related User entity using SQLAlchemy
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def create(self, entity: AuthEntity) -> AuthEntity:
        auth = Auth.from_entity(entity)

        self.session.add(auth)

        return auth.to_entity()

    def findall(self, **kwargs) -> Sequence[AuthEntity]:
        query = self.session.query(Auth)

        for key, value in kwargs.items():
            query = query.filter(getattr(Auth, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> AuthEntity | None:
        result: Auth | None = self.session.get(Auth, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: AuthEntity) -> AuthEntity:
        auth = Auth.from_entity(entity)
        update_data = auth.to_dict()

        for key in [Auth.updated_at.key, Auth.created_at.key, Auth.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(Auth).where(Auth.id_ == auth.id_).values(update_data).returning(Auth)
        )

        auth_mapping = self.session.execute(statement).mappings().one()
        result = Auth(**auth_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> AuthEntity:
        statement = delete(Auth).filter_by(id_=id_).returning(*Auth.__table__.columns)

        result: Auth = self.session.execute(statement).scalar_one()

        return result.to_entity()
