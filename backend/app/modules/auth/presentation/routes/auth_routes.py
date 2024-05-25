from fastapi import APIRouter

from .login_access_token_route import router as login_access_token_route
from .reset_password_route import router as reset_password_route
from .get_user_me_route import router as get_user_me_route


router = APIRouter()
router.include_router(login_access_token_route)
router.include_router(reset_password_route)
router.include_router(get_user_me_route)
