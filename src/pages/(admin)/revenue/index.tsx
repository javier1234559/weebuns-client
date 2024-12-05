import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CreateCourseButton from '~/features/admin/course/components/CreateCourseButton'
import CourseListManagerView from '~/features/admin/course/views/CourseListManagerView'

function RevenueManager() {
  const breadcrumb = [{ title: 'Revenue Manager', href: '' }]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Revenue Manager</Typography>
        <CreateCourseButton />
      </Box>
      <CourseListManagerView />
    </Container>
  )
}

RevenueManager.displayName = 'RevenueManager'
export default RevenueManager
