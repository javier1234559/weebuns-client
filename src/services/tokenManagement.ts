import TokenManagement from 'brainless-token-manager'

import { axiosInstance } from '~/services/api/axiosInstance'
import { deleteToken, getRefreshCookie, getToken, redirectToLogin, setToken } from '~/utils/token'

export const TokenManager = new TokenManagement({
  getAccessToken: async () => {
    const token = getToken()
    // Return empty string if no token to prevent parsing errors
    if (!token) return ''
    return token
  },
  getRefreshToken: async () => {
    const refreshToken = getRefreshCookie()
    // Return empty string if no refresh token
    if (!refreshToken) return ''
    return refreshToken
  },
  onInvalidRefreshToken: async () => {
    try {
      // Clean up on invalid token
      await axiosInstance.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      deleteToken()
      redirectToLogin()
    }
  },

  executeRefreshToken: async () => {
    try {
      const r = await axiosInstance.post('/api/auth/refresh-token')
      const { access_token } = r.data

      return {
        token: access_token,
        refresh_token: ''
      }
    } catch (error) {
      // Abort all pending requests before logout
      console.log('Error while refreshing token', error)

      // Clean up
      await axiosInstance.post('/api/auth/logout')
      deleteToken()
      redirectToLogin()

      return {
        token: '',
        refresh_token: ''
      }
    }
  },
  onRefreshTokenSuccess: ({ token }) => {
    if (token && typeof token === 'string') {
      setToken(token)
    }
  }
})
