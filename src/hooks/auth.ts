import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { globalConfig } from '~/config'
import { logout } from '~/store/authSlice'
import { RootState } from '~/store/store'

/**
 * Hook to get currently logged user
 * @returns {object | undefined} user data as object or undefined if user is not logged in
 */
export function useCurrentUser() {
  const auth = useSelector((state: RootState) => state.auth)
  return auth
}

/**
 * Hook to detect is current user authenticated or not
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export function useIsAuthenticated(): boolean {
  const auth = useSelector((state: RootState) => state.auth)

  const result = globalConfig.IS_FAKE_LOGIN || auth.accessToken !== ''
  return result
}

/**
 * Returns event handler to Logout current user
 * @returns {function} calling this event logs out current user
 */
export function useEventLogout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useCallback(() => {
    dispatch(logout())
    navigate('/', { replace: true }) // Redirect to home page by reloading the App
  }, [dispatch, navigate])
}

/**
 * Adds watchdog and calls different callbacks on user login and logout
 * @param {function} afterLogin callback to call after user login
 * @param {function} afterLogout callback to call after user logout
 */
export function useAuthWatchdog(afterLogin: () => void, afterLogout: () => void) {
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      afterLogin?.()
    } else {
      afterLogout?.()
    }
  }, [afterLogin, afterLogout])
}
