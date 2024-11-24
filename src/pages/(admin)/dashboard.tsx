import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import DashBoardOverView from '~/features/admin/dashboard/views/DashBoardOverView'
import { RootState } from '~/store/store'

function DashboardPage() {
  const breadcrumb = [{ title: 'Dashboard', href: '' }]
  const userName = useSelector((state: RootState) => state.auth.name)

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Welcome back, {userName}</Typography>
      </Box>
      <DashBoardOverView />
    </Container>
  )
}

DashboardPage.displayName = 'DashboardPage'
export default DashboardPage
