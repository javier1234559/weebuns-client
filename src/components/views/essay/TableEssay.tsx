import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import ChangeStatusModal from '~/components/modal/ChangeStatusModal'
import DeleteModal from '~/components/modal/DeleteModal'
import EditEssayModal from '~/components/modal/EditEssayModal'
import MoreActionButton from '~/components/views/essay/MoreActionButton'
import { useModal } from '~/provider/ModalContext'

interface Essay {
  id: string
  title: string
  publishDate: string
}

const essays: Essay[] = [
  { id: '1', title: 'Some tips for your first blog post', publishDate: 'Unpublished' },
  { id: '2', title: 'Some tips for your first blog post', publishDate: 'Public' }
  // Add more essays as needed
]

function TableEssay() {
  const theme = useTheme()
  const { openModal } = useModal()

  const handleDelete = (essayId: string) => {
    openModal(DeleteModal, { essayId })
  }

  const handleChangeStatus = (essayId: string) => {
    openModal(ChangeStatusModal, { essayId })
  }

  const handleEdit = (essayId: string) => {
    openModal(EditEssayModal, { essayId })
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid var(--bg-patterns-line-color1)' }}>
      <Table sx={{ minWidth: 650 }} aria-label='essay table'>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${theme.palette.primary.main}14`, // 14 is approximately 8% opacity in hex
              '& th': {
                color: theme.palette.text.primary,
                fontWeight: 'bold'
              }
            }}
          >
            <TableCell>Title</TableCell>
            <TableCell align='right'>Publish Date</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {essays.map((essay) => (
            <TableRow key={essay.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                <Typography variant='body1'>{essay.title}</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='body2' color='text.secondary'>
                  {essay.publishDate}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <MoreActionButton
                  onEdit={() => handleEdit(essay.id)}
                  onDelete={() => handleDelete(essay.id)}
                  onChangeStatus={() => handleChangeStatus(essay.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableEssay
