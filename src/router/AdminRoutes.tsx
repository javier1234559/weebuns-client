import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import AdminLayout from '~/components/layout/AdminLayout/AdminLayout'
import NavLayout from '~/components/layout/NavLayout'
import AuthWrapperAdmin from '~/router/components/AuthRedirectAdmin'
import { RouteNames } from '~/router/route-name'

// Lazy load components
const Landing = lazy(() => import('~/pages'))
const AdminLogin = lazy(() => import('~/pages/(admin)'))
const AppLoading = lazy(() => import('~/components/common/AppLoading'))
const CourseManager = lazy(() => import('~/pages/(admin)/course-manager'))
const CourseManagerDetail = lazy(() => import('~/pages/(admin)/course-manager/[id]'))
const AdminDashboard = lazy(() => import('~/pages/(admin)/dashboard'))
const UnitManager = lazy(() => import('~/pages/(admin)/unit-manager/[id]'))
const AdminUserManager = lazy(() => import('~/pages/(admin)/user-manager'))
const NotFoundView = lazy(() => import('~/pages/not-found'))

const ADMIN_ROUTES = [
  {
    path: '*',
    element: (
      <Suspense fallback={<AppLoading />}>
        <NotFoundView />
      </Suspense>
    )
  },
  //public routes
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
      }
    ]
  },
  {
    path: RouteNames.AdminLogin,
    element: (
      <Suspense fallback={<AppLoading />}>
        <AuthWrapperAdmin>
          <AdminLogin />
        </AuthWrapperAdmin>
      </Suspense>
    )
  },
  {
    element: <AdminLayout />,
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
        path: RouteNames.AdminDashboard,
        element: (
          <Suspense fallback={<AppLoading />}>
            <AdminDashboard />
          </Suspense>
        )
      },
      {
        path: RouteNames.AdminUserManager,
        element: (
          <Suspense fallback={<AppLoading />}>
            <AdminUserManager />
          </Suspense>
        )
      },
      {
        path: RouteNames.AdminCourseManager,
        element: (
          <Suspense fallback={<AppLoading />}>
            <CourseManager />
          </Suspense>
        )
      },
      {
        path: RouteNames.AdminCourseManagerDetail,
        element: (
          <Suspense fallback={<AppLoading />}>
            <CourseManagerDetail />
          </Suspense>
        )
      },
      {
        path: RouteNames.AdminUnitManager,
        element: (
          <Suspense fallback={<AppLoading />}>
            <UnitManager />
          </Suspense>
        )
      }
    ]
  }
]

export default ADMIN_ROUTES
