import copy
from datetime import datetime

from app.core.error.invalid_operation_exception import InvalidOperationError


class AuthEntity(object):
    """
    Auth represents your collection of auths as an entity
    """

    def __init__(
        self,
        id_: int | None,
        access_token: str,
        token_type: str,
        expires_in: int | int,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
        is_deleted: bool | None = False,
    ):
        self.id_ = id_
        self.access_token = access_token
        self.token_type = token_type
        self.expires_in = expires_in
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_deleted = is_deleted

    def __eq__(self, other) -> bool:
        if isinstance(other, AuthEntity):
            return self.id_ == other.id_

        return False

    def mark_entity_as_deleted(self) -> "AuthEntity":
        if self.is_deleted:
            raise InvalidOperationError("Auth is already marked as deleted")

        marked_entity = copy.deepcopy(self)
        marked_entity.is_deleted = True

        return marked_entity
