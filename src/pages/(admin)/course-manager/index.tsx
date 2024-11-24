import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CreateCourseButton from '~/features/admin/course/components/CreateCourseButton'
import CourseListManagerView from '~/features/admin/course/views/CourseListManagerView'

function CourseManager() {
  const breadcrumb = [{ title: 'Course Manager', href: '' }]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Course Manager</Typography>
        <CreateCourseButton />
      </Box>
      <CourseListManagerView />
    </Container>
  )
}

CourseManager.displayName = 'CourseManager'
export default CourseManager
