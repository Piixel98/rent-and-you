from typing import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.user.data.models.user import User
from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.modules.user.domain.services.user_query_service import UserQueryService


class UserQueryServiceImpl(UserQueryService):
    """
    UserQueryServiceImpl implements READ operations related to User entity using SQLALCHEMY
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> UserReadModel | None:
        result = self.session.get(User, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[UserReadModel | None]:
        statement = select(User).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [user.to_read_model() for user in result]
