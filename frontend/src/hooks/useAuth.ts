import {redirect, useNavigate} from '@tanstack/react-router'
import {
  AuthService, Body_auth_signin_api_v1_auth_signin_post, UserReadModel
} from "../client";
import {useQuery} from "react-query";
const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null
}

const useAuth = () => {
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery<UserReadModel | null, Error>(
    'currentUser',
    AuthService.getUserMeApiV1AuthUserGet,
    {
      enabled: isLoggedIn(),
    },
  )

  const login = async (data: Body_auth_signin_api_v1_auth_signin_post, nextUrl: string | null = null) => {
    const response = await AuthService.authSigninApiV1AuthSigninPost({
      formData: data,
    })
    localStorage.setItem('access_token', response.access_token)
    if (nextUrl) {
      navigate({to: nextUrl})
    } else {
      navigate({to: '/welcome'})
    }
}

  const logout = () => {
    localStorage.removeItem('access_token')
    redirect({
      to: '/',
    })
   }

  return { login, logout, user, isLoading}
}

export { isLoggedIn }
export default useAuth
