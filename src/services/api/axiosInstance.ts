import axios, { AxiosInstance } from 'axios'

import { globalConfig } from '~/config'
import { Api } from '~/services/api/api-axios'
import { TokenManager } from '~/services/tokenManagement'

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
