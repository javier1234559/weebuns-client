import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import UserListManager from '~/features/admin/user/views/UserListManager'

function UserManager() {
  const breadcrumb = [{ title: 'User Manager', href: '' }]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>User Manager</Typography>
      </Box>
      <UserListManager />
    </Container>
  )
}

UserManager.displayName = 'UserManager'
export default UserManager
