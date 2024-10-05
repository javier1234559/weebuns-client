import Box from '@mui/material/Box'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '~/components/common/ErrorBoundary'
import Header from '~/components/layout/PublicLayout/components/Navbar'
import { globalConfig } from '~/config'
import { LinkToPage } from '~/types/common'

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
if (globalConfig.IS_DEBUG) {
  SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings'
  })
}

const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PUBLIC
  document.title = title

  return (
    <ErrorBoundary name='Content'>
      <Box className='bg-patterns'>
        <Header />
        <Outlet />
        {children}
      </Box>
    </ErrorBoundary>
  )
}

export default PublicLayout
