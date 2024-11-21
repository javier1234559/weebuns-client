import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import { ModalProvider } from '~/contexts/ModalContext'
import ReviewButton from '~/features/vocabulary/components/ReviewButton'
import VocabView from '~/features/vocabulary/views/VocabView'
import { RouteNames } from '~/router/route-name'

function Vocabulary() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Vocabulary', href: '' }
  ]

  return (
    <Container>
      <ModalProvider>
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h4'>Vocabulary</Typography>
          <ReviewButton />
        </Box>
        <VocabView />
      </ModalProvider>
    </Container>
  )
}

Vocabulary.displayName = 'Vocabulary'
export default Vocabulary
