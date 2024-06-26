from pydantic import Field, BaseModel

from app.modules.rent.domain.entities.rent_common_model import RentBaseModel


class RentCreateModel(RentBaseModel):
    """
    RentCreateModel represents a write model to create a rent
    """


class RentUpdateModel(BaseModel):
    """
    RentUpdateModel represents a write model to update a rent
    """

    id_: int
    amount: float | None = Field(example=100.0)
    total_days: int | None = Field(example=5)
    is_active: bool | None = Field(example=True)
    is_deleted: bool | None = Field(example=True)
