from datetime import datetime

from pydantic import BaseModel


class RentBaseModel(BaseModel):
    """
    RentBase common fields
    """

    amount: float
    total_days: int
    pickup_date: datetime
    return_date: datetime
    office_id: int
    vehicle_id: int
    user_id: int
