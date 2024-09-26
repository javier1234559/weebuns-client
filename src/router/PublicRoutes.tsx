import { IS_DEBUG } from '~/config'
import { Navigate } from 'react-router-dom'
import { PublicLayout } from '~/components/layout'
import AuthView from '~/view/Auth/AuthView'
import DevView from '~/view/DevView'

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />, // Layout as parent/wrapper component for all routes
    children: [
      {
        path: '*',
        element: <Navigate to='/' />
      },
      {
        path: '/',
        element: <AuthView />
      },
      {
        path: '/auth',
        element: <AuthView />
      }
    ]
  }
]

// Add debug routes
IS_DEBUG &&
  PUBLIC_ROUTES[0].children.push({
    path: '/dev',
    element: <DevView />
  })

export default PUBLIC_ROUTES
