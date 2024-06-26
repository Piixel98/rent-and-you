from fastapi import APIRouter, Depends

from app.core.auth import get_current_active_user
from .auth_signin_route import router as auth_signin_route
from .auth_signup_route import router as auth_signup_route
from .get_user_me_route import router as get_user_me_route
from .update_user_me_route import router as update_user_me_route
from .get_user_rents_route import router as get_user_rents_route


router = APIRouter()
router.include_router(auth_signin_route)
router.include_router(auth_signup_route)
router.include_router(
    get_user_me_route, dependencies=[Depends(get_current_active_user)]
)
router.include_router(
    update_user_me_route, dependencies=[Depends(get_current_active_user)]
)
router.include_router(
    get_user_rents_route, dependencies=[Depends(get_current_active_user)]
)
