import { useNavigate } from '@tanstack/react-router'
import {AuthService, UserService} from "../client";
import {useState} from "react";

const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const login = async (data) => {
    setIsLoading(true)
    const response = await AuthService.loginAccessTokenApiV1AuthLoginAccessTokenPost({
      formData: data,
    })
    localStorage.setItem('access_token', response.access_token)
    const userDetails = await UserService.getUsersApiV1UsersGet({email: data.email})
    setUser(userDetails)
    setIsLoading(false)
    navigate({ to: '/welcome' })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    navigate({ to: '/' })
  }

  return { login, logout, user, isLoading }
}

export { isLoggedIn }
export default useAuth
