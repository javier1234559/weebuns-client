import MoreVertIcon from '@mui/icons-material/MoreVert'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'

interface ActionButtonProps {
  onClick: () => void
}

function ActionButton({ onClick }: ActionButtonProps) {
  return (
    <IconButton onClick={onClick} size='small'>
      <MoreVertIcon />
    </IconButton>
  )
}

interface Quiz {
  id: string
  title: string
  publishDate: string
  correctAnswers: number
  wrongAnswers: number
  timeTaken: string
}

const quizzes: Quiz[] = [
  { id: '1', title: 'Quiz1', publishDate: 'Unpublished', correctAnswers: 8, wrongAnswers: 2, timeTaken: '10:30' },
  { id: '2', title: 'Quiz2', publishDate: 'Public', correctAnswers: 6, wrongAnswers: 4, timeTaken: '15:45' },
  { id: '3', title: 'Quiz3', publishDate: 'Public', correctAnswers: 9, wrongAnswers: 1, timeTaken: '08:20' }
]

function getQuizStatus(correct: number, wrong: number): { label: string; color: 'success' | 'warning' | 'error' } {
  const total = correct + wrong
  const percentage = (correct / total) * 100

  if (percentage >= 80) return { label: 'Excellent', color: 'success' }
  if (percentage >= 60) return { label: 'Good', color: 'warning' }
  return { label: 'Needs Improvement', color: 'error' }
}

function TableQuiz() {
  const theme = useTheme()

  const handleActionClick = (quizId: string) => {
    toast.success(`Action clicked for quiz ${quizId}`)
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid var(--bg-patterns-line-color1)' }}>
      <Table sx={{ minWidth: 650 }} aria-label='quiz table'>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${theme.palette.primary.main}14`,
              '& th': {
                color: theme.palette.text.primary,
                fontWeight: 'bold'
              }
            }}
          >
            <TableCell>Title</TableCell>
            <TableCell align='right'>Correct</TableCell>
            <TableCell align='right'>Wrong</TableCell>
            <TableCell align='right'>Time Taken</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Publish Date</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => {
            const status = getQuizStatus(quiz.correctAnswers, quiz.wrongAnswers)
            return (
              <TableRow key={quiz.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <Typography variant='body1'>{quiz.title}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2'>{quiz.correctAnswers}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2'>{quiz.wrongAnswers}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2'>{quiz.timeTaken}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Chip label={status.label} color={status.color} size='small' />
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2' color='text.secondary'>
                    {quiz.publishDate}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <ActionButton onClick={() => handleActionClick(quiz.id)} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableQuiz
