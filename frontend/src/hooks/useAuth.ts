import {redirect, useNavigate} from '@tanstack/react-router'
import {
  AuthService,
  Body_login_access_token_api_v1_auth_login_access_token_post, UserReadModel,
  UserService
} from "../client";
import {useQueryClient} from "react-query";
import {useState} from "react";


const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null
}

const getRole = () => {
  return localStorage.getItem('role')
}

const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [user, setUser] = useState<UserReadModel | null>(null);

  const login = async (data: Body_login_access_token_api_v1_auth_login_access_token_post) => {
    const response = await AuthService.loginAccessTokenApiV1AuthLoginAccessTokenPost({
      formData: data,
    })
    console.log(response);
    localStorage.setItem('access_token', response.access_token)
    const userDetails = await UserService.getUsersApiV1UsersGet({email: data.username})
    queryClient.setQueryData('currentUser', userDetails[0]);
    localStorage.setItem('role', userDetails[0]?.role || 'user')
    setUser(userDetails[0])
    navigate({to: '/welcome'})
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('is_admin')
    queryClient.invalidateQueries('currentUser')
    setUser(null)
    redirect({
      to: '/',
    })
   }

  return { login, logout, user }
}

export { isLoggedIn, getRole }
export default useAuth
