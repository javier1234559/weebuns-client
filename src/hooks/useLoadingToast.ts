import { useCallback } from 'react'
import toast from 'react-hot-toast'

export const useLoadingToast = () => {
  const runWithLoading = useCallback(
    async <T>(
      operation: () => Promise<T>,
      options: {
        loadingMessage?: string
        successMessage?: string
        errorMessage?: string
      } = {}
    ) => {
      const {
        loadingMessage = 'Please wait...',
        successMessage = 'Operation successful',
        errorMessage = 'An error occurred'
      } = options

      const toastId = toast.loading(loadingMessage)

      try {
        const result = await operation()
        toast.success(successMessage, { id: toastId })
        return result
      } catch (error) {
        toast.error(errorMessage, { id: toastId })
        throw error
      }
    },
    []
  )

  return { runWithLoading }
}
