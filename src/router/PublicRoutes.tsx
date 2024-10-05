import { PublicLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import Landing from '~/pages'
import AuthView from '~/pages/Auth/Auth'
import Login from '~/pages/Auth/Login/Login'
import DevView from '~/pages/Dev'
import NotFoundView from '~/pages/NotFoundView'

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundView />
      },
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/auth',
        element: <AuthView />
      },
      {
        path: '/sign-in',
        element: <Login />
      }
    ]
  }
]

// Add debug routes
if (globalConfig.IS_DEBUG) {
  PUBLIC_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />
  })
}

export default PUBLIC_ROUTES
