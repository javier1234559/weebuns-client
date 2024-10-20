import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { logout } from '~/features/auth/authSlice'
import { useIsAuthenticated } from '~/hooks/auth'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth)
  const isAuthenticated = useIsAuthenticated()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated || !auth.accessToken) {
      toast.error('You need to be logged in to access this page')
      dispatch(logout())
    }
  }, [isAuthenticated, auth.accessToken, dispatch])

  if (!isAuthenticated || !auth.accessToken) {
    // Redirect to login page with the return url
    return <Navigate to={`/${RouteNames.Login}?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return <>{children}</>
}

export default PrivateRoute
