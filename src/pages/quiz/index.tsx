import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import CreateQuizButton from '~/features/quiz/components/CreateQuizButton'
import QuizListView from '~/features/quiz/views/QuizListView.'
import { RouteNames } from '~/router/route-name'

function Quiz() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Quiz },
    { title: 'Quiz', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Quiz</Typography>
        <CreateQuizButton />
      </Box>
      <QuizListView />
    </Container>
  )
}

Quiz.displayName = 'Quiz'
export default Quiz
