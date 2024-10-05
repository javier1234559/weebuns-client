import { lazy, Suspense } from 'react'

import AppLoading from '~/components/common/AppLoading'
import { PrivateLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import { RouteNames } from '~/router/route-name'

// Lazy load components
const Landing = lazy(() => import('~/pages'))
const App = lazy(() => import('~/pages/App'))
const DevView = lazy(() => import('~/pages/Dev'))
const NotFoundView = lazy(() => import('~/pages/NotFoundView'))
const NotImplementedView = lazy(() => import('~/pages/NotImplementedView'))

const ADMIN_ROUTES = [
  {
    element: <PrivateLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: (
          <Suspense fallback={<AppLoading />}>
            <NotFoundView />
          </Suspense>
        )
      },
      {
        path: RouteNames.Home,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Landing />
          </Suspense>
        )
      },
      {
        path: RouteNames.Dashboard,
        element: (
          <Suspense fallback={<AppLoading />}>
            <App />
          </Suspense>
        )
      },
      {
        path: RouteNames.ME,
        element: (
          <Suspense fallback={<AppLoading />}>
            <NotImplementedView />
          </Suspense>
        )
      }
    ]
  }
]

// Add debug routes
if (globalConfig.IS_DEBUG) {
  ADMIN_ROUTES[0].children.push({
    path: '/dev',
    element: (
      <Suspense fallback={<AppLoading />}>
        <DevView />
      </Suspense>
    )
  })
}

export default ADMIN_ROUTES
