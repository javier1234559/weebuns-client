import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CreateVocabButton from '~/features/vocabulary/components/CreateVocabButton'
import VocabView from '~/features/vocabulary/views/VocabView'
import { RouteNames } from '~/router/route-name'

function Vocabulary() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Vocabulary', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Vocabulary</Typography>
        <CreateVocabButton />
      </Box>
      <VocabView />
    </Container>
  )
}

Vocabulary.displayName = 'Vocabulary'
export default Vocabulary
