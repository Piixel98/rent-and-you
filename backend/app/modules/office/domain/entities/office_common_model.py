from pydantic import BaseModel, Field


class OfficeBaseModel(BaseModel):
    """
    OfficeBase common fields
    """

    name: str
    phone: str
    address: str
    postal_code: str
    city: str
    geo_location: str | None
    email: str = Field(example="test@test.com")
