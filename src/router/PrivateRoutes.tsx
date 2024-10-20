import { PrivateLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import DevView from '~/pages/dev-view'
import NotFoundView from '~/pages/not-found'
import NotImplementedView from '~/pages/not-implement-view'

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
