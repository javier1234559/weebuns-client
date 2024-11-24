import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import { ModalProvider } from '~/contexts/ModalContext'
import CreateSpaceButton from '~/features/space/components/CreateSpaceButton'
import SpaceDashBoard from '~/features/space/views/SpaceDashBoard'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'

function LearningSpace() {
  const userName = useSelector((state: RootState) => state.auth.name)
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Space', href: '' }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <ModalProvider>
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='h4'>Welcome back, {userName}</Typography>
          </Box>
          <CreateSpaceButton />
        </Box>
        <SpaceDashBoard />
      </ModalProvider>
    </Box>
  )
}

LearningSpace.displayName = 'LearningSpace'
export default LearningSpace
