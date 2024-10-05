import { useCallback, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLoading from '~/components/common/AppLoading'
import { globalConfig } from '~/config'
import { useAuthWatchdog } from '~/hooks/auth'
import TransitionWrapper from '~/router/TransitionWrapper'
import PRIVATE_ROUTES from './PrivateRoutes'
import PUBLIC_ROUTES from './PublicRoutes'

import { RouteObject } from 'react-router-dom'

const createRouterWithTransition = (routes: RouteObject[]) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <TransitionWrapper />,
      children: routes
    }
  ])
}

const routesPrivate = createRouterWithTransition(PRIVATE_ROUTES)
const routesPublic = createRouterWithTransition(PUBLIC_ROUTES)

const Routes = () => {
  const [loading, setLoading] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)
  const isAuthenticated = false
  // const isAuthenticated = useIsAuthenticated()

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
    console.log('Render <Routes/>', { isAuthenticated, refresh: refreshCount })
  }

  return <RouterProvider router={isAuthenticated ? routesPrivate : routesPublic} />
}
export default Routes
