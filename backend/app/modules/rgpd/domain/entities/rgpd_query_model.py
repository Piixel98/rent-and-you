from datetime import datetime
from typing import Optional

from pydantic import Field

from app.modules.rgpd.domain.entities.rgpd_entity import RGPDEntity
from app.modules.rgpd.domain.entities.rgpd_common_model import RGPDBaseModel


class RGPDReadModel(RGPDBaseModel):
    """
    RGPDReadModel represents data structure as a read model
    """

    id_: Optional[int] = Field()
    created_at: Optional[datetime] = Field()
    updated_at: Optional[datetime] = Field()

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: RGPDEntity) -> "RGPDReadModel":
        return RGPDReadModel(
            id_=entity.id_,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            rgpd=entity.rgpd,
            lssi=entity.lssi,
            user_id=entity.user_id,
        )
