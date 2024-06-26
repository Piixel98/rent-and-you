from pydantic import Field, BaseModel

from app.modules.office.domain.entities.office_common_model import OfficeBaseModel


class OfficeCreateModel(OfficeBaseModel):
    """
    OfficeCreateModel represents a write model to create a office
    """


class OfficeUpdateModel(BaseModel):
    """
    OfficeUpdateModel represents a write model to update a office
    """

    name: str | None
    phone: str | None
    address: str | None
    geo_location: str | None
    city: str | None
    postal_code: str | None
    email: str | None
    is_active: bool | None = Field(example=True)
    is_deleted: bool | None = Field(example=True)
