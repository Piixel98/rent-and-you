from app.core.repositories.base_repository import BaseRepository
from app.modules.auth.domain.entities.auth_entity import AuthEntity


class AuthRepository(BaseRepository[AuthEntity]):
    """UserRepository defines a repositories interface for User entity"""

    pass
