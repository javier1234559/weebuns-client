import { lazy, Suspense } from 'react'

import AppLoading from '~/components/common/AppLoading'
import { PrivateLayout, PublicLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import Register from '~/pages/(Auth)/Register'
import AuthWrapper from '~/router/components/AuthRedirect'
import PrivateRoute from '~/router/components/PrivateRoute'
import { RouteNames } from '~/router/route-name'

// Lazy load your components
const Landing = lazy(() => import('~/pages'))
const App = lazy(() => import('~/pages/App'))
const AuthView = lazy(() => import('~/pages/(Auth)/Auth'))
const Login = lazy(() => import('~/pages/(Auth)/Login/Login'))
const DevView = lazy(() => import('~/pages/Dev'))
const NotFoundView = lazy(() => import('~/pages/NotFoundView'))
const Assignment = lazy(() => import('~/pages/Assignment'))
const Course = lazy(() => import('~/pages/Course'))
const Vocabulary = lazy(() => import('~/pages/Vocabulary'))

const USER_ROUTES = [
  {
    element: <PublicLayout />,
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
        path: RouteNames.Auth,
        element: (
          <Suspense fallback={<AppLoading />}>
            <PrivateRoute>
              <AuthView />
            </PrivateRoute>
          </Suspense>
        )
      },
      {
        path: RouteNames.Login,
        element: (
          <Suspense fallback={<AppLoading />}>
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          </Suspense>
        )
      },
      {
        path: RouteNames.Register,
        element: (
          <Suspense fallback={<AppLoading />}>
            <AuthWrapper>
              <Register />
            </AuthWrapper>
          </Suspense>
        )
      }
    ]
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
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
        path: RouteNames.Dashboard,
        element: (
          <Suspense fallback={<AppLoading />}>
            <App />
          </Suspense>
        )
      },
      {
        path: RouteNames.Assignment,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Assignment />
          </Suspense>
        )
      },
      {
        path: '/course',
        element: (
          <Suspense fallback={<AppLoading />}>
            <Course />
          </Suspense>
        )
      },
      {
        path: RouteNames.Vocabulary,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Vocabulary />
          </Suspense>
        )
      }
    ]
  }
]

// Add debug routes
if (globalConfig.IS_DEBUG) {
  USER_ROUTES[0].children.push({
    path: '/dev',
    element: (
      <Suspense fallback={<AppLoading />}>
        <DevView />
      </Suspense>
    )
  })
}

export default USER_ROUTES
