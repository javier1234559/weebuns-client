import TokenManagement from 'brainless-token-manager'

import { axiosInstant } from '~/services/api/axiosInstance'
import { deleteToken, getRefreshCookie, getToken, redirectToLogin, setToken } from '~/utils/token'

export const TokenManager = new TokenManagement({
  getAccessToken: async () => {
    const token = getToken()
    return `${token}`
  },
  getRefreshToken: async () => {
    const refreshToken = getRefreshCookie()
    return `${refreshToken}`
  },
  onInvalidRefreshToken: () => {
    // Logout, redirect to login
  },
  executeRefreshToken: async () => {
    try {
      const r = await axiosInstant.post('/api/auth/refresh-token')
      const { access_token } = r.data

      return {
        token: access_token,
        refresh_token: ''
      }
    } catch (error) {
      // Abort all pending requests before logout
      console.log('Error while refreshing token', error)

      // delete cookie
      await axiosInstant.post('/api/auth/logout')

      deleteToken()
      redirectToLogin()

      return {
        token: '',
        refresh_token: ''
      }
    }
  },
  onRefreshTokenSuccess: ({ token, refresh_token }) => {
    console.log(refresh_token)
    if (token) {
      setToken(token)
    }
  }
})
