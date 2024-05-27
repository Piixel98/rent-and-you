from pydantic import BaseModel

from app.modules.auth.domain.entities.auth_entity import AuthEntity


class AuthBaseModel(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user_id: int | None = None

    class Config:
        orm_mode = True

    @staticmethod
    def from_entity(entity: AuthEntity) -> "AuthBaseModel":
        return AuthBaseModel(
            id_=entity.id_,
            access_token=entity.access_token,
            token_type=entity.token_type,
            expires_in=entity.expires_in,
            user_id=entity.user_id,
        )


# Contents of JWT token
class TokenPayload(BaseModel):
    exp: int | None = None
    sub: str | None = None
    admin: bool | None = None
