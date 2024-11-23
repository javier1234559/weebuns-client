import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CourseDetailView from '~/features/course/view/CourseDetailView'
import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'
import { RouteNames } from '~/router/route-name'

function CourseDetail() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'My Course', href: RouteNames.MyCourse },
    { title: 'Explore Course', href: RouteNames.Course },
    { title: 'Course Detail', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Course Detail</Typography>
      </Box>
      <CourseDetailView />
      <FloatingVocabButton />
    </Container>
  )
}

export default CourseDetail
