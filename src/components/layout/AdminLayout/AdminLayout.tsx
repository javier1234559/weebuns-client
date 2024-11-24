import TopBarAndSideBarLayout from '~/components/layout/PrivateLayout/TopBarAndSideBarLayout'
import { SIDEBAR_NAV_LINKS_ADMIN } from '~/router/sidebar-nav-link'

const TITLE_PRIVATE = 'Weebuns - Admin Management'

const AdminLayout = () => {
  const title = TITLE_PRIVATE
  document.title = title

  return (
    <TopBarAndSideBarLayout
      sidebarItems={SIDEBAR_NAV_LINKS_ADMIN}
      sidebarItemsSpace={[]}
      title={title}
      variant='sidebarPersistentOnDesktop'
    >
      {/* <Outlet /> */}
    </TopBarAndSideBarLayout>
  )
}

export default AdminLayout
