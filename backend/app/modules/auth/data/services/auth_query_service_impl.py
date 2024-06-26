from typing import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.modules.auth.data.models.auth import Auth
from app.modules.auth.domain.entities.auth_common_model import AuthBaseModel
from app.modules.auth.domain.services.auth_query_service import AuthQueryService


class AuthQueryServiceImpl(AuthQueryService):
    """
    UserQueryServiceImpl implements READ operations related to User entity using SQLALCHEMY
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id_: int) -> AuthBaseModel | None:
        result = self.session.get(Auth, id_)

        if result is None:
            return None

        return result.to_read_model()

    def findall(self, **kwargs) -> Sequence[AuthBaseModel | None]:
        statement = select(Auth).filter_by(is_deleted=False, **kwargs)

        result = self.session.execute(statement).scalars().all()

        if len(result) == 0:
            return []

        return [auth.to_read_model() for auth in result]
