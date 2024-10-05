import { FunctionComponent, PropsWithChildren } from 'react'
import Stack from '@mui/material/Stack'

import TopBarAndSideBarLayout from '~/components/layout/PrivateLayout/TopBarAndSideBarLayout'
import { globalConfig } from '~/config'
import { LinkToPage } from '~/types/common'

const TITLE_PRIVATE = 'Weebuns | ENGLISH E LEARNING'

/**
 * SideBar navigation items with links for Private Layout
 */
const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Home',
    path: '/',
    icon: 'home'
  },
  {
    title: 'My Profile',
    path: '/me',
    icon: 'account'
  },
  {
    title: '404',
    path: '/wrong-url',
    icon: 'error'
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

/**
 * Renders "Private Layout" composition
 * @layout PrivateLayout
 */
const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PRIVATE
  document.title = title

  return (
    <TopBarAndSideBarLayout sidebarItems={SIDE_BAR_ITEMS} title={title} variant='sidebarPersistentOnDesktop'>
      {children}
      <Stack component='footer'>Copyright &copy; by Javier</Stack>
    </TopBarAndSideBarLayout>
  )
}

export default PrivateLayout
