import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CourseLearnView from '~/features/course/view/CourseLearnView'
import { RouteNames } from '~/router/route-name'

function CourseLearn() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'My Course', href: RouteNames.MyCourse },
    { title: 'Course Learn', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Course</Typography>
      </Box>
      <CourseLearnView />
    </Container>
  )
}

export default CourseLearn
