import axios, { AxiosInstance } from 'axios'
import TokenManagement from 'brainless-token-manager'

import { globalConfig } from '~/config'
import { Api } from '~/services/api-axios'
import { deleteToken, getRefreshCookie, getToken, redirectToLogin, setToken } from '~/utils/token'

class AxiosService {
  private static instance: AxiosService
  public axiosInstance: AxiosInstance
  private abortController: AbortController

  private constructor() {
    this.abortController = new AbortController()
    this.axiosInstance = axios.create({
      baseURL: globalConfig.API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      signal: this.abortController.signal
    })
  }

  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService()
    }
    return AxiosService.instance
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  public abortRequests(): void {
    this.abortController.abort()
    this.abortController = new AbortController()
    this.axiosInstance.defaults.signal = this.abortController.signal
  }
}

export const axiosService = AxiosService.getInstance()
export const axiosInstant = axiosService.getAxiosInstance()

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
      axiosService.abortRequests()

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// import axios from 'axios'
// import { globalConfig } from '~/config'
// import { Api } from '~/services/api-axios'
// import { deleteRefreshCookie, deleteToken, getToken, setToken } from '~/services/token'
// import TokenManagement, { parseJwt } from './tokenManagement'

// export const axiosInstant = axios.create({
//   baseURL: globalConfig.API_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// export const TokenManager = new TokenManagement({
//   getAccessToken: () => {
//     const token = getToken()
//     return `${token}`
//   },
//   isTokenValid: () => {
//     try {
//       const token = getToken()
//       const decoded = parseJwt(token)
//       const { exp } = decoded

//       const currentTime = Date.now() / 1000
//       if (exp - 5 > currentTime) {
//         return true
//       }

//       return false
//     } catch (error) {
//       console.log('Error while checking token', error)
//       return false
//     }
//   },
//   onRefreshToken(done) {
//     axiosInstant
//       .get('/api/auth/refresh-token')
//       .then((result: any) => {
//         const { access_token } = result.data
//         if (access_token) {
//           setToken(access_token)
//           done(access_token)
//           return
//         }

//         deleteToken()
//         deleteRefreshCookie()
//       })
//       .catch((err) => {
//         console.log('Error while refreshing token', err)

//         deleteToken()
//         deleteRefreshCookie()
//       })
//   }
// })

// export const injectHeaders = async (headers: any) => {
//   const token: string = (await TokenManager.getToken()) as string

//   if (!headers) {
//     return {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   if (headers?.Authorization) {
//     return {
//       ...headers
//     }
//   }

//   if (headers) {
//     return {
//       ...headers,
//       Authorization: `Bearer ${token}`
//     }
//   }

//   return {
//     ...headers,
//     Authorization: `Bearer ${token}`
//   }
// }

// const api = new Api({
//   instance: axiosInstant,
//   injectHeaders
// })

// export default api.api

// import axios from 'axios'
// import TokenManagement from 'brainless-token-manager'
// import { globalConfig } from '~/config'
// import { Api } from '~/services/api-axios'
// import { deleteToken, getRefreshCookie, getToken, setToken } from '~/services/token'

// export const axiosInstant = axios.create({
//   baseURL: globalConfig.API_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// export const TokenManager = new TokenManagement({
//   getAccessToken: async () => {
//     const token = getToken()
//     return `${token}`
//   },
//   getRefreshToken: async () => {
//     const refreshToken = getRefreshCookie()
//     return `${refreshToken}`
//   },
//   onInvalidRefreshToken: () => {
//     // Logout, redirect to login
//   },
//   executeRefreshToken: async () => {
//     try {
//       const r = await axiosInstant.post('/api/auth/refresh-token')
//       const { access_token } = r.data

//       return {
//         token: access_token,
//         refresh_token: ''
//       }
//     } catch (error) {
//       deleteToken()
//       await axiosInstant.post('/api/auth/logout')
//       // window.location.href = '/login'

//       return {
//         token: '',
//         refresh_token: ''
//       }
//     }
//   },
//   onRefreshTokenSuccess: ({ token, refresh_token }) => {
//     console.log(refresh_token)
//     if (token) {
//       setToken(token)
//     }
//   }
// })

// export const injectHeaders = async (headers: any) => {
//   const token: string = (await TokenManager.getToken()) as string

//   if (!headers) {
//     return {
//       Authorization: `Bearer ${token}`
//     }
//   }

//   if (headers?.Authorization) {
//     return {
//       ...headers
//     }
//   }

//   if (headers) {
//     return {
//       ...headers,
//       Authorization: `Bearer ${token}`
//     }
//   }

//   return {
//     ...headers,
//     Authorization: `Bearer ${token}`
//   }
// }

// const api = new Api({
//   instance: axiosInstant,
//   injectHeaders
// })

// export default api.api
