import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CourseDetailManagerView from '~/features/admin/course/views/CourseDetailManagerView'
import { RouteNames } from '~/router/route-name'
function CourseManagerDetail() {
  const breadcrumb = [
    { title: 'Course Manager', href: RouteNames.AdminCourseManager },
    { title: 'Course Detail', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Course Detail</Typography>
      </Box>
      <CourseDetailManagerView />
    </Container>
  )
}

CourseManagerDetail.displayName = 'CourseManagerDetail'
export default CourseManagerDetail
