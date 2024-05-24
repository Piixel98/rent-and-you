from typing import Sequence

from sqlalchemy import select, update, delete
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session

from app.modules.user.domain.entities.user_entity import UserEntity
from app.modules.user.domain.repositories.user_repository import UserRepository
from app.modules.user.data.models.user import User


class UserRepositoryImpl(UserRepository):
    """
    UserRepositoryImpl implements CRUD operations related User entity using SQLAlchemy
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_email(self, email: str) -> UserEntity | None:
        statement = select(User).filter_by(email=email)

        try:
            result: User = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def find_by_document_id(self, document_id: str) -> UserEntity | None:
        statement = select(User).filter_by(document_id=document_id)

        try:
            result: User = self.session.execute(statement).scalar_one()
        except NoResultFound:
            return None

        return result.to_entity()

    def create(self, entity: UserEntity) -> UserEntity:
        user = User.from_entity(entity)

        self.session.add(user)

        return user.to_entity()

    def findall(self, **kwargs) -> Sequence[UserEntity]:
        query = self.session.query(User)

        for key, value in kwargs.items():
            query = query.filter(getattr(User, key) == value)

        return query.all()

    def find_by_id(self, id_: int) -> UserEntity | None:
        result: User | None = self.session.get(User, id_)

        if result is None:
            return None

        return result.to_entity()

    def update(self, entity: UserEntity) -> UserEntity:
        user = User.from_entity(entity)
        update_data = user.to_dict()

        for key in [User.updated_at.key, User.created_at.key, User.id_.key]:
            (update_data.pop(key),)

        statement = (
            update(User).where(User.id_ == user.id_).values(update_data).returning(User)
        )

        user_mapping = self.session.execute(statement).mappings().one()
        result = User(**user_mapping)

        return result.to_entity()

    def delete_by_id(self, id_: int) -> UserEntity:
        statement = delete(User).filter_by(id_=id_).returning(*User.__table__.columns)

        result: User = self.session.execute(statement).scalar_one()

        return result.to_entity()
