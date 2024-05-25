from pydantic import BaseModel

from app.modules.auth.domain.entities.auth_entity import AuthEntity


class AuthBaseModel(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: AuthEntity) -> "AuthBaseModel":
        return AuthBaseModel(
            access_token=entity.access_token,
            token_type=entity.token_type,
            expires_in=entity.expires_in,
        )


# Contents of JWT token
class TokenPayload(BaseModel):
    exp: int | None = None
    sub: int | None = None
    admin: bool | None = None
