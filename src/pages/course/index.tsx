import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CourseExploreView from '~/features/course/view/CourseExploreView'
import { RouteNames } from '~/router/route-name'

function Note() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'My Course', href: RouteNames.MyCourse },
    { title: 'Explore Course', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Explore Course</Typography>
      </Box>
      <CourseExploreView />
    </Container>
  )
}

Note.displayName = 'Note'
export default Note
