"""
    Dependencies which can be used for DI
"""

from app.config import Settings
from functools import lru_cache


@lru_cache()
def get_settings():
    return Settings()
