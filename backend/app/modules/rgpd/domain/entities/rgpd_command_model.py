from pydantic import Field

from app.modules.rgpd.domain.entities.rgpd_common_model import RGPDBaseModel


class RGPDCreateModel(RGPDBaseModel):
    """
    RGPDCreateModel represents a write model to create a rgpd
    """

    rgpd: bool = Field(example=True)
    lssi: bool = Field(example=True)


class RGPDUpdateModel(RGPDBaseModel):
    """
    RGPDUpdateModel represents a write model to update a rgpd
    """

    rgpd: bool = Field(example=True)
    lssi: bool = Field(example=True)
