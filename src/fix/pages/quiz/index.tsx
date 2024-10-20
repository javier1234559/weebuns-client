import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import AppButton from '~/components/common/AppButton'
import TableQuiz from '~/features/quiz/views/TabletQuiz'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'
import { replacePathId } from '~/utils/replace-text'

function CreateQuizButton() {
  const space = useSelector((state: RootState) => state.space.currentSpace)
  const navigate = useNavigate()

  const navigateToCreateQuiz = () => {
    if (!space) {
      toast.error('Please select a space first')
      return
    }

    if (!space?.id) {
      toast.error('Space ID is not available')
      return
    }

    const linkToNavigate = replacePathId(RouteNames.QuizCreate, space.id)
    navigate(linkToNavigate)
  }

  return (
    <AppButton variant='black' onClick={navigateToCreateQuiz}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Create
      </Typography>
    </AppButton>
  )
}

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
      <TableQuiz />
    </Container>
  )
}

Quiz.displayName = 'Quiz'
export default Quiz
