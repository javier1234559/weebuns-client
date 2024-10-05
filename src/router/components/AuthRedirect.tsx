import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import AppLoading from '~/components/common/AppLoading'
import { useIsAuthenticated } from '~/hooks/auth'
import { RouteNames } from '~/router/route-name'

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true)
  const [searchParams] = useSearchParams()
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || RouteNames.Dashboard
      navigate(redirect, { replace: true })
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, navigate, searchParams])

  if (isChecking) {
    return <AppLoading /> // or a loading spinner
  }

  return <>{children}</>
}

export default AuthWrapper
