from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import Mapped
from app.core.models.postgres.models import Base
from app.modules.auth.domain.entities.auth_entity import AuthEntity


class Auth(Base):
    """
    Auth DTO is an object associated with auth entity
    """

    __tablename__ = "auth"

    access_token: Mapped[str] | str = Column(String, nullable=False, unique=True)
    token_type: Mapped[str] | str = Column(String)
    expires_in: Mapped[int] | int = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id_"), nullable=False)

    def to_entity(self) -> AuthEntity:
        return AuthEntity(
            id_=self.id_,
            access_token=self.access_token,
            token_type=self.token_type,
            expires_in=self.expires_in,
            user_id=self.user_id,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "access_token": self.access_token,
            "token_type": self.token_type,
            "expires_in": self.expires_in,
            "user_id": self.user_id,
        }

    def to_read_model(self) -> AuthEntity:
        return AuthEntity(
            id_=self.id_,
            access_token=self.access_token,
            token_type=self.token_type,
            expires_in=self.expires_in,
            user_id=self.user_id,
        )

    @staticmethod
    def from_entity(auth: AuthEntity) -> "Auth":
        return Auth(
            id_=auth.id_,
            access_token=auth.access_token,
            token_type=auth.token_type,
            expires_in=auth.expires_in,
            user_id=auth.user_id,
        )
