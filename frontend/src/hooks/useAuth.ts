import { useQuery } from 'react-query'
import { useNavigate } from '@tanstack/react-router'

import {
  UsersService,
} from '../client'

const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const { data: user, isLoading } = useQuery<UserOut | null, Error>(
    'currentUser',
    UsersService.readUserMe,
    {
      enabled: isLoggedIn(),
    },
  )

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    localStorage.setItem('access_token', response.access_token)
    navigate({ to: '/' })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate({ to: '/login' })
  }

  // return { login, logout, user, isLoading }
    return false
}

export { isLoggedIn }
export default useAuth
