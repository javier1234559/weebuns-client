import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import EssayCreateView from '~/features/essay/view/EssayCreateView'
import { RouteNames } from '~/router/route-name'

function EssayCreate() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Essay', href: RouteNames.Essay },
    { title: 'Create Essay', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Essay</Typography>
      </Box>
      <EssayCreateView />
    </Container>
  )
}

export default EssayCreate
