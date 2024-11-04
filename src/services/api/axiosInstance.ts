import axios from 'axios'

import { globalConfig } from '~/config'
import { Api } from '~/services/api/api-axios'
import { getToken } from '~/utils/token'

export const axiosInstance = axios.create({
  baseURL: globalConfig.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Header injection for auth
const injectHeaders = async (headers: Record<string, string | undefined>) => {
  const token = getToken()

  // Safe check for Content-Type
  const contentType = headers?.['Content-Type']
  const isFormData = contentType && typeof contentType === 'string' && contentType.includes('multipart/form-data')

  if (isFormData) {
    return {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined
    }
  }

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
    ...headers
  }
}

const api = new Api({
  instance: axiosInstance,
  injectHeaders
})

export default api.api

// class AxiosService {
//   private static instance: AxiosService
//   public axiosInstance: AxiosInstance
//   private abortController: AbortController

//   private constructor() {
//     this.abortController = new AbortController()
//     this.axiosInstance = axios.create({
//       baseURL: globalConfig.API_URL,
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       signal: this.abortController.signal
//     })
//   }

//   public static getInstance(): AxiosService {
//     if (!AxiosService.instance) {
//       AxiosService.instance = new AxiosService()
//     }
//     return AxiosService.instance
//   }

//   public getAxiosInstance(): AxiosInstance {
//     return this.axiosInstance
//   }

//   public abortRequests(): void {
//     this.abortController.abort()
//     this.abortController = new AbortController()
//     this.axiosInstance.defaults.signal = this.abortController.signal
//   }
// }

// export const axiosService = AxiosService.getInstance()
// export const axiosInstant = axiosService.getAxiosInstance()

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const injectHeaders = async (headers: any) => {
//   // const token: string = (await TokenManager.getToken()) as string
//   const token = getToken() as string

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
