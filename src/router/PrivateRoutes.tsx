import { PrivateLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import DevView from '~/pages/DevView'
import NotFoundView from '~/pages/NotFoundView'
import NotImplementedView from '~/pages/NotImplementedView'

const PRIVATE_ROUTES = [
  {
    element: <PrivateLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <NotFoundView />
      },
      // {
      //   path: 'auth/*',
      //   element: <Navigate to='/' replace />
      // },
      {
        path: '/me',
        element: <NotImplementedView />
      }
    ]
  }
]

// Add debug routes
if (globalConfig.IS_DEBUG) {
  PRIVATE_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />
  })
}

export default PRIVATE_ROUTES
