import { FunctionComponent, PropsWithChildren } from 'react'
import { IS_DEBUG } from '~/config'
import { LinkToPage } from '~/types/common'
import ErrorBoundary from '~/components/common/ErrorBoundary'
import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/PublicLayout/components/Navbar'

const TITLE_PUBLIC = 'Weebuns Elearning'

const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login'
  },
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login'
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup'
  },
  {
    title: 'About',
    path: '/about',
    icon: 'info'
  }
]

// Add debug links
IS_DEBUG &&
  SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings'
  })

const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PUBLIC
  document.title = title

  return (
    <ErrorBoundary name='Content'>
      <Header />
      <Outlet />
      {children}
    </ErrorBoundary>
  )
}

export default PublicLayout
