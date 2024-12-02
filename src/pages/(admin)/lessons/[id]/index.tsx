import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import LessonDetailView from '~/features/admin/lesson/views/LessonDetailView'
import { RouteNames } from '~/router/route-name'

function LessonDetailPage() {
  const breadcrumb = [
    { title: 'Course Manager', href: RouteNames.AdminCourseManager },
    { title: 'Lesson', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Lesson Detail</Typography>
      </Box>
      <LessonDetailView />
    </Container>
  )
}

LessonDetailPage.displayName = 'LessonDetailPage'
export default LessonDetailPage
