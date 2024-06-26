from datetime import date
from enum import Enum

from sqlalchemy import Column, Boolean, String, Date
from sqlalchemy.orm import Mapped

from app.modules.user.domain.entities.user_query_model import UserReadModel
from app.core.models.postgres.models import Base
from app.modules.user.domain.entities.user_entity import UserEntity


class DocumentType:
    NIF = "NIF"
    CIF = "CIF"
    NIE = "NIE"
    PASAPORTE = "Pasaporte"


class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


class User(Base):
    """
    User DTO is an object associated with user entity
    """

    __tablename__ = "users"

    document_type: Mapped[DocumentType] = Column(String)
    document_id: Mapped[str] | str = Column(String, unique=True, index=True)
    expiration_date: Mapped[date] | date = Column(Date)
    first_name: Mapped[str] | str = Column(String)
    last_name: Mapped[str] | str = Column(String)
    postal_code: Mapped[str] | str = Column(String)
    address: Mapped[str] | str = Column(String)
    city: Mapped[str] | str = Column(String)
    phone_number: Mapped[str] | str = Column(String)
    birth_date: Mapped[date] | date = Column(Date)
    role: Mapped[str] = Column(String)
    email: Mapped[str] | str = Column(String, index=True)
    hashed_password: Mapped[str] | str = Column(String)
    is_active: Mapped[bool] | bool | None = Column(Boolean, default=True)

    def to_entity(self) -> UserEntity:
        return UserEntity(
            id_=self.id_,
            document_type=self.document_type,
            document_id=self.document_id,
            expiration_date=self.expiration_date,
            first_name=self.first_name,
            last_name=self.last_name,
            postal_code=self.postal_code,
            address=self.address,
            city=self.city,
            phone_number=self.phone_number,
            birth_date=self.birth_date,
            role=self.role,
            hashed_password=self.hashed_password,
            email=self.email,
            is_active=self.is_active,
            created_at=self.created_at,
            updated_at=self.updated_at,
            is_deleted=self.is_deleted,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "document_type": self.document_type,
            "document_id": self.document_id,
            "expiration_date": self.expiration_date,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "postal_code": self.postal_code,
            "address": self.address,
            "city": self.city,
            "phone_number": self.phone_number,
            "birth_date": self.birth_date,
            "role": self.role,
            "hashed_password": self.hashed_password,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_deleted": self.is_deleted,
        }

    def to_read_model(self) -> UserReadModel:
        return UserReadModel(
            id_=self.id_,
            document_type=self.document_type,
            document_id=self.document_id,
            expiration_date=self.expiration_date,
            first_name=self.first_name,
            last_name=self.last_name,
            postal_code=self.postal_code,
            address=self.address,
            city=self.city,
            phone_number=self.phone_number,
            birth_date=self.birth_date,
            role=self.role,
            hashed_password=self.hashed_password,
            email=self.email,
            is_active=self.is_active,
            is_deleted=self.is_deleted,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    @staticmethod
    def from_entity(user: UserEntity) -> "User":
        return User(
            id_=user.id_,
            document_type=user.document_type,
            document_id=user.document_id,
            expiration_date=user.expiration_date,
            first_name=user.first_name,
            last_name=user.last_name,
            postal_code=user.postal_code,
            address=user.address,
            birth_date=user.birth_date,
            city=user.city,
            phone_number=user.phone_number,
            role=user.role,
            hashed_password=user.hashed_password,
            email=user.email,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
            is_deleted=user.is_deleted,
        )

    @property
    def is_admin(self) -> bool:
        return self.role == UserRole.ADMIN

    @property
    def is_user(self) -> bool:
        return self.role == UserRole.USER

    @property
    def password_hash(self) -> str:
        from app.core.auth import get_password_hash

        return get_password_hash(self.password_hash)
