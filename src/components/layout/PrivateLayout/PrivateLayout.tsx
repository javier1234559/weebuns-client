import { FunctionComponent, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import TopBarAndSideBarLayout from '~/components/layout/PrivateLayout/TopBarAndSideBarLayout'
import { globalConfig } from '~/config'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'
import { LinkToPage } from '~/types/common'
import { replacePathId } from '~/utils/replace-text'

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
    title: 'Learning Space',
    path: RouteNames.LearningSpace,
    icon: 'space'
  }
]

const SIDE_BAR_ITEMS_SPACE: Array<LinkToPage> = [
  {
    title: 'Essay',
    path: RouteNames.Essay,
    icon: 'essay'
  },
  {
    title: 'Quiz',
    path: RouteNames.Quiz,
    icon: 'quiz'
  },
  {
    title: 'Vocabulary',
    path: RouteNames.Vocabulary,
    icon: 'vocabulary'
  },
  {
    title: 'Setting',
    path: RouteNames.Setting,
    icon: 'settings'
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

  const idSpace: string | undefined = useSelector((state: RootState) => state.space.currentSpace?.id)
  let SETUP_SIDE_BAR_ITEMS_SPACE: LinkToPage[] = []

  if (idSpace) {
    SETUP_SIDE_BAR_ITEMS_SPACE = SIDE_BAR_ITEMS_SPACE.map((item) => {
      const newPath = replacePathId(item.path, idSpace)
      return {
        ...item,
        path: newPath
      }
    })
  }

  return (
    <TopBarAndSideBarLayout
      sidebarItems={SIDE_BAR_ITEMS}
      sidebarItemsSpace={SETUP_SIDE_BAR_ITEMS_SPACE}
      title={title}
      variant='sidebarPersistentOnDesktop'
    >
      {children}
    </TopBarAndSideBarLayout>
  )
}

export default PrivateLayout
