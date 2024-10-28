import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CreateEssayButton from '~/features/essay/components/CreateEssayButton'
import EssayListView from '~/features/essay/view/EssayListView'
import { RouteNames } from '~/router/route-name'

function Essay() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Essay', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Essay</Typography>
        <CreateEssayButton />
      </Box>
      <EssayListView />
    </Container>
  )
}

Essay.displayName = 'Essay'
export default Essay
