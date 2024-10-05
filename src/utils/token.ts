import Cookies from 'js-cookie'
import { RouteNames } from '~/router/route-name'

export const getToken = () => {
  return localStorage.getItem('accessToken')
}
export const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const deleteToken = () => {
  localStorage.removeItem('accessToken')
}

export const getRefreshCookie = () => {
  return Cookies.get('refreshToken')
}

export const deleteRefreshCookie = () => {
  Cookies.remove('refreshToken')
}

export const checkIsRoleAdmin = () => {
  const token = getToken()
  if (!token) {
    return false
  }
  const payload = token.split('.')[1]
  const data = JSON.parse(atob(payload))
  return data.role === 'admin'
}

export const redirectToLogin = () => {
  window.location.replace(`${RouteNames.Login}?redirect=${window.location.href}`)
  // or history.push('/login') if your Login page is inside the same app
}

// export const getRefreshToken = () => {
//   return localStorage.getItem('refreshToken')
// }
// export const updateRefreshToken = (refreshToken: string) => {
//   localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
// }

// export const getTokenAdmin = () => {
//   return localStorage.getItem('accessTokenAdmin')
// }
// export const updateTokenAdmin = (accessToken: string) => {
//   localStorage.setItem('accessTokenAdmin', accessToken)
// }
// export const getRefreshTokenAdmin = () => {
//   return localStorage.getItem('refreshTokenAdmin')
// }
// export const updateRefreshTokenAdmin = (refreshToken: string) => {
//   localStorage.setItem('refreshTokenAdmin', JSON.stringify(refreshToken))
// }
