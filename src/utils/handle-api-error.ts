import toast from 'react-hot-toast'
import logOnDev from './log-on-dev'

export const handleApiError = (error: any, customMessage?: string) => {
  const errorMessage = customMessage || error.response?.data?.message || 'An error occurred'
  toast.error(errorMessage)
  logOnDev(errorMessage)
}
