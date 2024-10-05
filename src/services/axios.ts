import axios from 'axios'
import { globalConfig } from '~/config'
import { Api } from '~/services/api-axios'
import { deleteToken, getToken, setToken } from '~/services/token'
import TokenManagement, { parseJwt } from './tokenManagement'

export const axiosInstant = axios.create({
  baseURL: globalConfig.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const TokenManager = new TokenManagement({
  getAccessToken: () => {
    const token = getToken()
    return `${token}`
  },
  isTokenValid: () => {
    try {
      const token = getToken()
      const decoded = parseJwt(token)
      const { exp } = decoded

      const currentTime = Date.now() / 1000
      if (exp - 5 > currentTime) {
        return true
      }

      return false
    } catch (error) {
      console.log('Error while checking token', error)
      return false
    }
  },
  onRefreshToken(done) {
    axiosInstant
      .get('/api/auth/refresh-token')
      .then((result: any) => {
        const { access_token } = result.data
        if (access_token) {
          setToken(access_token)
          done(access_token)
          return
        }
        done(null)
      })
      .catch((err) => {
        console.log('Error while refreshing token', err)
        // done(null)
      })
  }
})

export const injectHeaders = async (headers: any) => {
  const token: string = (await TokenManager.getToken()) as string

  if (!headers) {
    return {
      Authorization: `Bearer ${token}`
    }
  }

  if (headers?.Authorization) {
    return {
      ...headers
    }
  }

  if (headers) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`
  }
}

const api = new Api({
  instance: axiosInstant,
  injectHeaders
})

export default api.api
