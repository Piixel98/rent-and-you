from sqlalchemy import Column, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped
from app.core.models.postgres.models import Base
from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_query_model import RGPDReadModel


class RGPD(Base):
    """
    RGPD DTO is an object associated with rgpd entity
    """

    __tablename__ = "rgpds"

    # RGPD
    rgpd: Mapped[bool] = Column(Boolean)
    # LSSI
    lssi: Mapped[bool] = Column(Boolean)

    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id_"))

    def to_entity(self) -> RGPDEntity:
        return RGPDEntity(
            id_=self.id_,
            lssi=self.lssi,
            user_id=self.user_id,
            created_at=self.created_at,
            updated_at=self.updated_at,
            rgpd=self.rgpd,
        )

    def to_dict(self):
        return {
            "id_": self.id_,
            "rgpd": self.rgpd,
            "lssi": self.lssi,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_read_model(self) -> RGPDReadModel:
        return RGPDReadModel(
            id_=self.id_,
            rgpd=self.rgpd,
            lssi=self.lssi,
            user_id=self.user_id,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    @staticmethod
    def from_entity(rgpd: RGPDEntity) -> "RGPD":
        return RGPD(
            id_=rgpd.id_,
            rgpd=rgpd.rgpd,
            lssi=rgpd.lssi,
            user_id=rgpd.user_id,
            created_at=rgpd.created_at,
            updated_at=rgpd.updated_at,
        )
