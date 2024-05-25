from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import Mapped
from app.core.models.postgres.models import Base
from app.modules.auth.domain.entities.auth_entity import AuthEntity


class Auth(Base):
    """
    Auth DTO is an object associated with auth entity
    """

    __tablename__ = "auth"

    access_token: Mapped[str] | str = Column(String)
    token_type: Mapped[str] | str = Column(String)
    expires_in: Mapped[int] | int = Column(Integer)

    def to_entity(self) -> AuthEntity:
        return AuthEntity(
            id_=self.id_,
            access_token=self.access_token,
            token_type=self.token_type,
            expires_in=self.expires_in,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "access_token": self.access_token,
            "token_type": self.token_type,
            "expires_in": self.expires_in,
        }

    def to_read_model(self) -> AuthEntity:
        return AuthEntity(
            id_=self.id_,
            access_token=self.access_token,
            token_type=self.token_type,
            expires_in=self.expires_in,
        )

    @staticmethod
    def from_entity(user: AuthEntity) -> "Auth":
        return Auth(
            access_token=user.access_token,
            token_type=user.token_type,
            expires_in=user.expires_in,
        )
