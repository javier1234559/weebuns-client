import { useCallback, useState } from 'react'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import AppLoading from '~/components/common/AppLoading'
import { globalConfig } from '~/config'
import { useAuthWatchdog, useIsAuthenticated } from '~/hooks/auth'
import TransitionWrapper from '~/router/components/TransitionWrapper'
import { checkIsRoleAdmin } from '~/utils/token'

import ADMIN_ROUTES from './AdminRoutes'
import USER_ROUTES from './UserRoutes'

const createRouterWithTransition = (routes: RouteObject[]) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <TransitionWrapper />,
      children: routes
    }
  ])
}

const routesPrivate = createRouterWithTransition(ADMIN_ROUTES)
const routesPublic = createRouterWithTransition(USER_ROUTES)

function Routes() {
  const [loading, setLoading] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)
  const isAuthenticated = useIsAuthenticated()
  const isRoleAdmin = checkIsRoleAdmin()

  const afterLogin = useCallback(() => {
    setRefreshCount((old) => old + 1) // Force re-render
    setLoading(false)
  }, [])

  const afterLogout = useCallback(() => {
    setRefreshCount((old) => old + 1) // Force re-render
    setLoading(false)
  }, [])

  // Create Auth watchdog, that calls our callbacks wen user is logged in or logged out
  useAuthWatchdog(afterLogin, afterLogout)

  if (loading) {
    return <AppLoading />
  }

  if (globalConfig.IS_DEBUG) {
    console.log('Render <Routes/>', { isAuthenticated, isRoleAdmin, refresh: refreshCount })
  }

  return <RouterProvider router={isRoleAdmin ? routesPrivate : routesPublic} />
}
export default Routes
