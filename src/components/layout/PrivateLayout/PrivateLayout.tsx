import { useSelector } from 'react-redux'

import TopBarAndSideBarLayout from '~/components/layout/PrivateLayout/TopBarAndSideBarLayout'
import { SIDEBAR_NAV_LINKS_USER, SIDEBAR_NAV_LINKS_USER_DEFAULT } from '~/router/sidebar-nav-link'
import { RootState } from '~/store/store'
import { LinkToPage } from '~/types/common'
import { replacePathId } from '~/utils/replace-path'

const TITLE_PRIVATE = 'Weebuns - English Learning'

/**
 * Renders "Private Layout" composition
 * @layout PrivateLayout
 */
const PrivateLayout = () => {
  const title = TITLE_PRIVATE
  document.title = title

  const idSpace: string | undefined = useSelector((state: RootState) => state.space.currentSpace?.id)
  let SETUP_SIDE_BAR_ITEMS_SPACE: LinkToPage[] = []

  if (idSpace) {
    SETUP_SIDE_BAR_ITEMS_SPACE = SIDEBAR_NAV_LINKS_USER.map((item) => {
      const newPath = replacePathId(item.path, idSpace)
      return {
        ...item,
        path: newPath
      }
    })
  }

  return (
    <TopBarAndSideBarLayout
      sidebarItems={SIDEBAR_NAV_LINKS_USER_DEFAULT}
      sidebarItemsSpace={SETUP_SIDE_BAR_ITEMS_SPACE}
      title={title}
      variant='sidebarPersistentOnDesktop'
    >
      {/* <Outlet /> */}
    </TopBarAndSideBarLayout>
  )
}

export default PrivateLayout
