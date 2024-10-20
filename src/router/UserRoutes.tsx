import { lazy, Suspense } from 'react'

import AppLoading from '~/components/common/AppLoading'
import { PrivateLayout, PublicLayout } from '~/components/layout'
import Register from '~/fix/pages/(auth)/register'
import AuthWrapper from '~/router/components/AuthRedirect'
import PrivateRoute from '~/router/components/PrivateRoute'
import { RouteNames } from '~/router/route-name'

// Lazy load your components
const Landing = lazy(() => import('~/fix/pages'))
const App = lazy(() => import('~/fix/pages/app'))
const AuthView = lazy(() => import('~/fix/pages/(auth)/Auth'))
const Login = lazy(() => import('~/fix/pages/(auth)/login'))
const DevView = lazy(() => import('~/fix/pages/dev-view'))
const NotFoundView = lazy(() => import('~/fix/pages/not-found'))
const Vocabulary = lazy(() => import('~/fix/pages/vocabulary'))
const LearningSpace = lazy(() => import('~/fix/pages/space'))
const Quiz = lazy(() => import('~/fix/pages/quiz'))
const Essay = lazy(() => import('~/fix/pages/essay'))
const EssayCreate = lazy(() => import('~/fix/pages/essay/[id]/essay-create'))
const Setting = lazy(() => import('~/fix/pages/setting'))
const EssayDetail = lazy(() => import('~/fix/pages/essay/[id]/essay-detail'))

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
        path: RouteNames.LearningSpace,
        element: (
          <Suspense fallback={<AppLoading />}>
            <LearningSpace />
          </Suspense>
        )
      },
      {
        path: RouteNames.Essay,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Essay />
          </Suspense>
        )
      },
      {
        path: RouteNames.EssayCreate,
        element: (
          <Suspense fallback={<AppLoading />}>
            <EssayCreate />
          </Suspense>
        )
      },
      {
        path: RouteNames.EssayDetail,
        element: (
          <Suspense fallback={<AppLoading />}>
            <EssayDetail />
          </Suspense>
        )
      },
      {
        path: RouteNames.Quiz,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Quiz />
          </Suspense>
        )
      },
      {
        path: RouteNames.Setting,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Setting />
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
// if (globalConfig.IS_DEBUG) {
USER_ROUTES[0].children.push({
  path: '/dev',
  element: (
    <Suspense fallback={<AppLoading />}>
      <DevView />
    </Suspense>
  )
})
// }

export default USER_ROUTES
