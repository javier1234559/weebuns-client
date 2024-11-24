import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

import { AppError } from '~/components/common/AppError'
import AppIcon from '~/components/common/AppIcon'
import { AppLoading } from '~/components/common/AppLoading'
import AppTag from '~/components/common/AppTag'
import PaginationUrl from '~/components/feature/PaginationUrl'
import DeleteModal from '~/components/modal/DeleteModal'
import { Select, SelectItem } from '~/components/ui/select'
import { useModal } from '~/contexts/ModalContext'
import MoreActionButton from '~/features/essay/components/MoreActionButton'
import { useDeleteEssayByUser, useListEssayByUser } from '~/features/essay/hooks/useEssayQueries'
import EssayUpdateStatusModal from '~/features/essay/modal/EssayStatusModal'
import useFilterParams from '~/hooks/useFilterParams'
import usePagination from '~/hooks/usePagination'
import { RouteNames } from '~/router/route-name'
import { StatusParams } from '~/types/extend-api'
import { convertToRelativeTime } from '~/utils/format-date'
import { replacePathId } from '~/utils/replace-path'

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' }
]

function TableEssay() {
  const theme = useTheme()
  const { openModal } = useModal()
  const navigator = useNavigate()
  const { page, perPage, updateQueryParams } = usePagination({ defaultPage: 1, defaultPerPage: 2 })
  const { status, updateStatus, resetStatus } = useFilterParams({
    defaultStatus: ''
  })

  const { data, isLoading, isError, error } = useListEssayByUser({
    page,
    perPage,
    ...(status && { status: status as StatusParams })
  })
  const mutation = useDeleteEssayByUser()

  const handleDelete = (essayId: string) => {
    const handleDelete = async () => {
      const loadingId = 'Deleting essay...'
      try {
        await mutation.mutateAsync(essayId)
        toast.success('Delete essay successfully', { id: loadingId })
      } catch (error) {
        console.error('Delete essay failed:', error)
        toast.error('Delete essay failed', { id: loadingId })
      }
    }

    openModal(DeleteModal, { essayId, onConfirm: handleDelete })
  }

  const handleChangeStatus = (essayId: string, currentStatus: string) => {
    openModal(EssayUpdateStatusModal, { essayId, currentStatus: currentStatus })
  }

  const handleView = (essayId: string) => {
    navigator(RouteNames.EssayUpdate.replace(':id', essayId))
  }

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value
    if (!newStatus) {
      resetStatus()
    } else {
      updateStatus(newStatus)
    }
  }

  if (isLoading)
    return (
      <Grid item xs={12} md={8}>
        <AppLoading />
      </Grid>
    )

  if (!data || error) {
    return <AppError error={error} />
  }

  return (
    <Grid mt={2}>
      <Box mb={3}>
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <Select name='' placeholder='Essay Status' value={status} onChange={handleStatusChange}>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid var(--bg-patterns-line-color1)' }}>
        <Table sx={{ minWidth: 650 }} aria-label='essay table'>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: `${theme.palette.primary.main}14`,
                whiteSpace: 'nowrap',
                '& th': {
                  color: theme.palette.text.primary,
                  fontWeight: '600'
                }
              }}
            >
              <TableCell>Title</TableCell>
              <TableCell>Corrections</TableCell>
              <TableCell>Hashtags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ border: 0 }}>
                  <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' py={4}>
                    <AppIcon icon='essay' />
                    <Typography variant='body1' color='textSecondary' sx={{ mt: 2 }}>
                      No essays found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((essay) => (
                <TableRow key={essay.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box>
                      <Link to={`${replacePathId(RouteNames.EssayDetail, essay.id)}`}>
                        <Typography variant='body1' color='text.primary'>
                          {essay.title}
                        </Typography>
                      </Link>
                      {essay.summary && (
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            mt: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {essay.summary}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{essay.corrections?.length || 0}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' flexWrap='wrap'>
                      {essay.hashtags?.map((tag) => (
                        <AppTag key={tag.id} tag={tag.hashtag?.name || ''} variant='outlined' />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align='left'>
                    <AppTag tag={essay.status} variant='filled' />
                  </TableCell>
                  <TableCell align='left'>
                    <Typography variant='body2' color='text.secondary'>
                      {convertToRelativeTime(essay.updatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <MoreActionButton
                      onEdit={() => handleView(essay.id)}
                      onDelete={() => handleDelete(essay.id)}
                      onChangeStatus={() => handleChangeStatus(essay.id, essay.status)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} mx='auto'>
        <PaginationUrl
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        />
      </Box>
    </Grid>
  )
}

export default TableEssay
