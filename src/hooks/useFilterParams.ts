import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface StatusFilterParams {
  defaultStatus?: string
}

const useFilterParams = ({ defaultStatus = '' }: StatusFilterParams = {}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState<string>(defaultStatus)

  // Initialize and sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const statusParam = params.get('status')

    if (statusParam) {
      setStatus(statusParam)
    } else if (defaultStatus) {
      setStatus(defaultStatus)
    }
  }, [location.search, defaultStatus])

  // Update status and URL
  const updateStatus = useCallback(
    (newStatus: string) => {
      const params = new URLSearchParams(location.search)

      if (!newStatus) {
        params.delete('status')
      } else {
        params.set('status', newStatus)
      }

      // Preserve other params while updating status
      navigate({ search: params.toString() }, { replace: true })
      setStatus(newStatus)
    },
    [navigate, location.search]
  )

  // Reset status
  const resetStatus = useCallback(() => {
    const params = new URLSearchParams(location.search)
    params.delete('status')
    navigate({ search: params.toString() }, { replace: true })
    setStatus('')
  }, [navigate, location.search])

  return {
    status,
    updateStatus,
    resetStatus
  }
}

export default useFilterParams
