import { PrivateLayout } from '~/components/layout'
import { IS_DEBUG } from '~/config'
import DevView from '~/view/DevView'
import NotFoundView from '~/view/NotFoundView'
import NotImplementedView from '~/view/NotImplementedView'
import WelcomeView from '~/view/Welcome'

const PRIVATE_ROUTES = [
  {
    element: <PrivateLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <NotFoundView />
      },
      {
        path: '/',
        element: <WelcomeView />
      },
      // {
      //   path: 'auth/*',
      //   element: <Navigate to='/' replace />
      // },
      // {
      //   path: 'about',
      //   element: <AboutView />
      // },
      {
        path: '/me',
        element: <NotImplementedView />
      }
    ]
  }
]

// Add debug routes
IS_DEBUG &&
  PRIVATE_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />
  })

export default PRIVATE_ROUTES
