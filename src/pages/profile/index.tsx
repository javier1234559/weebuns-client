import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import { ModalProvider } from '~/contexts/ModalContext'
import ProfileView from '~/features/user/view/ProfileView'
import { RouteNames } from '~/router/route-name'

function Profile() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Profile', href: '' }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <ModalProvider>
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h4'>User profile</Typography>
        </Box>
        <ProfileView />
      </ModalProvider>
    </Box>
  )
}

Profile.displayName = 'Profile'
export default Profile
