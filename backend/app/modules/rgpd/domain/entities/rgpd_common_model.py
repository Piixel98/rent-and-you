from pydantic import BaseModel


class RGPDBaseModel(BaseModel):
    """
    RGPDBase common fields
    """

    rgpd: bool | None
    lssi: bool | None
    user_id: int | None
