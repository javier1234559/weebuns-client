import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import AppLoading from '~/components/common/AppLoading'
import { PrivateLayout, PublicLayout } from '~/components/layout'
import NavLayout from '~/components/layout/NavLayout'
import { globalConfig } from '~/config'
import Register from '~/pages/(auth)/register'
import AuthWrapper from '~/router/components/AuthRedirect'
import PrivateRoute from '~/router/components/PrivateRoute'
import { RouteNames } from '~/router/route-name'

// Lazy load your components
const Landing = lazy(() => import('~/pages'))
const AdminLogin = lazy(() => import('~/pages/(admin)'))
const App = lazy(() => import('~/pages/app'))
const AuthView = lazy(() => import('~/pages/(auth)/Auth'))
const Login = lazy(() => import('~/pages/(auth)/login'))
const DevView = lazy(() => import('~/pages/dev-view'))
const NotFoundView = lazy(() => import('~/pages/not-found'))
const Vocabulary = lazy(() => import('~/pages/vocabulary'))
const LearningSpace = lazy(() => import('~/pages/space'))
const Note = lazy(() => import('~/pages/note'))
const MyCourse = lazy(() => import('~/pages/course/my-course'))
const Course = lazy(() => import('~/pages/course'))
const CourseDetail = lazy(() => import('~/pages/course/[id]/detail'))
const CourseLearn = lazy(() => import('~/pages/course/[id]/learn'))
const UnitDetail = lazy(() => import('~/pages/unit/[id]/UnitDetail'))
const Essay = lazy(() => import('~/pages/essay'))
const EssayCreate = lazy(() => import('~/pages/essay/[id]/essay-create'))
const Setting = lazy(() => import('~/pages/setting'))
const EssayDetail = lazy(() => import('~/pages/essay/[id]/essay-detail'))
const EssayUpdate = lazy(() => import('~/pages/essay/[id]/essay-update'))
const Thanks = lazy(() => import('~/pages/thanks'))
const Pricing = lazy(() => import('~/pages/pricing'))
const Blog = lazy(() => import('~/pages/blog/index'))
const About = lazy(() => import('~/pages/about'))
const ForgotPassword = lazy(() => import('~/pages/(auth)/forgot-password'))

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
      // Nhóm các routes cần NavLayout
      {
        element: (
          <Suspense fallback={<AppLoading />}>
            <NavLayout>
              <Outlet />
            </NavLayout>
          </Suspense>
        ),
        children: [
          {
            path: RouteNames.Home,
            element: <Landing />
          },
          {
            path: RouteNames.Auth,
            element: (
              <PrivateRoute>
                <AuthView />
              </PrivateRoute>
            )
          },
          {
            path: RouteNames.Login,
            element: (
              <AuthWrapper>
                <Login />
              </AuthWrapper>
            )
          },
          {
            path: RouteNames.Register,
            element: (
              <AuthWrapper>
                <Register />
              </AuthWrapper>
            )
          },
          {
            path: RouteNames.ForgotPassword,
            element: (
              <AuthWrapper>
                <ForgotPassword />
              </AuthWrapper>
            )
          },
          {
            path: RouteNames.Thanks,
            element: (
              <Suspense fallback={<AppLoading />}>
                <Thanks />
              </Suspense>
            )
          },
          {
            path: RouteNames.Pricing,
            element: (
              <Suspense fallback={<AppLoading />}>
                <Pricing />
              </Suspense>
            )
          },
          {
            path: RouteNames.Blog,
            element: (
              <Suspense fallback={<AppLoading />}>
                <Blog />
              </Suspense>
            )
          },
          {
            path: RouteNames.About,
            element: (
              <Suspense fallback={<AppLoading />}>
                <About />
              </Suspense>
            )
          }
        ]
      },
      // Routes không cần NavLayout
      {
        path: RouteNames.AdminLogin,
        element: (
          <Suspense fallback={<AppLoading />}>
            <AdminLogin />
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
        path: RouteNames.EssayUpdate,
        element: (
          <Suspense fallback={<AppLoading />}>
            <EssayUpdate />
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
        path: RouteNames.Note,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Note />
          </Suspense>
        )
      },
      {
        path: RouteNames.MyCourse,
        element: (
          <Suspense fallback={<AppLoading />}>
            <MyCourse />
          </Suspense>
        )
      },
      {
        path: RouteNames.Course,
        element: (
          <Suspense fallback={<AppLoading />}>
            <Course />
          </Suspense>
        )
      },
      {
        path: RouteNames.CourseDetail,
        element: (
          <Suspense fallback={<AppLoading />}>
            <CourseDetail />
          </Suspense>
        )
      },
      {
        path: RouteNames.CourseLearn,
        element: (
          <Suspense fallback={<AppLoading />}>
            <CourseLearn />
          </Suspense>
        )
      },
      {
        path: RouteNames.UnitDetail,
        element: (
          <Suspense fallback={<AppLoading />}>
            <UnitDetail />
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
