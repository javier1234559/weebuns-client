import { Navigate } from 'react-router-dom'

import { PublicLayout } from '~/components/layout'
import { globalConfig } from '~/config'
import Landing from '~/pages'
import DevView from '~/pages/dev-view'

const PUBLIC_ROUTES = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: '*',
        element: <Navigate to='/' />
      },
      {
        path: '/',
        element: <Landing />
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
