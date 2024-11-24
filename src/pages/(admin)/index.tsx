import Container from '@mui/material/Container'

import AdminLoginView from '~/features/admin/user/views/AdminLoginView'

function AdminLogin() {
  return (
    <Container>
      <AdminLoginView />
    </Container>
  )
}

AdminLogin.displayName = 'AdminLogin'
export default AdminLogin
