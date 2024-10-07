import Stack from '@mui/material/Stack'
import { FunctionComponent, PropsWithChildren } from 'react'

import TopBarAndSideBarLayout from '~/components/layout/PrivateLayout/TopBarAndSideBarLayout'
import { globalConfig } from '~/config'
import { RouteNames } from '~/router/route-name'
import { LinkToPage } from '~/types/common'

const TITLE_PRIVATE = 'Weebuns - English Learning'

/**
 * SideBar navigation items with links for Private Layout
 */
const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Home',
    path: RouteNames.Dashboard,
    icon: 'home'
  },
  {
    title: 'Assignment',
    path: RouteNames.Assignment,
    icon: 'assignment'
  },
  {
    title: 'Course',
    path: RouteNames.Course,
    icon: 'course'
  },
  {
    title: 'Vocabulary',
    path: RouteNames.Vocabulary,
    icon: 'vocabulary'
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
    </TopBarAndSideBarLayout>
  )
}

export default PrivateLayout
