import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import JoinCourseButton from '~/features/course/components/JoinCourseButton'
import MyCourseListView from '~/features/course/view/MyCourseListView'
import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'
import { RouteNames } from '~/router/route-name'

function MyCourse() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Course Joined', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Course Joined</Typography>
        <JoinCourseButton />
      </Box>
      <MyCourseListView />
      <FloatingVocabButton />
    </Container>
  )
}

MyCourse.displayName = 'MyCourse'
export default MyCourse
