import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import { ModalProvider } from '~/contexts/ModalContext'
import CreateSpaceButton from '~/features/space/components/CreateSpaceButton'
import SpaceDashBoard from '~/features/space/views/SpaceDashBoard'
import { RouteNames } from '~/router/route-name'

function LearningSpace() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Space', href: '' }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <ModalProvider>
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h4'>Learning Space</Typography>
          <CreateSpaceButton />
        </Box>
        <SpaceDashBoard />
      </ModalProvider>
    </Box>
  )
}

LearningSpace.displayName = 'LearningSpace'
export default LearningSpace
