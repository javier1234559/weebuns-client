import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CourseCreateView from '~/features/admin/course/views/CourseCreateView'
import { RouteNames } from '~/router/route-name'

function CourseManagerCreate() {
  const breadcrumb = [
    { title: 'Course Manager', href: RouteNames.AdminCourseManager },
    { title: 'Create Course', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Create Course</Typography>
      </Box>
      <CourseCreateView />
    </Container>
  )
}

CourseManagerCreate.displayName = 'CourseManagerCreate'
export default CourseManagerCreate
