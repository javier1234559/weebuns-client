import { Outlet } from 'react-router-dom'

import ErrorBoundary from '~/components/common/ErrorBoundary'

const TITLE_PUBLIC = 'Weebuns Elearning'

// const SIDE_BAR_ITEMS: Array<LinkToPage> = [
//   {
//     title: 'Log In',
//     path: '/auth/login',
//     icon: 'login'
//   },
//   {
//     title: 'Log In',
//     path: '/auth/login',
//     icon: 'login'
//   },
//   {
//     title: 'Sign Up',
//     path: '/auth/signup',
//     icon: 'signup'
//   },
//   {
//     title: 'About',
//     path: '/about',
//     icon: 'info'
//   }
// ]

// // Add debug links
// if (globalConfig.IS_DEBUG) {
//   SIDE_BAR_ITEMS.push({
//     title: '[Debug Tools]',
//     path: '/dev',
//     icon: 'settings'
//   })
// }

const PublicLayout = () => {
  const title = TITLE_PUBLIC
  document.title = title

  return (
    <ErrorBoundary name='Content'>
      <Outlet />
    </ErrorBoundary>
  )
}

export default PublicLayout
