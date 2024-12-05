import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { AppButton } from '~/components/common/AppButton'
import { Select, SelectItem } from '~/components/ui/select'
import { STATUS_OPTIONS } from '~/features/essay/essay.type'
import { useUpdateEssay } from '~/features/essay/hooks/useEssayQueries'
import { ContentStatus } from '~/services/api/api-axios'

interface EssayUpdateStatusModalProps {
  essayId: string
  currentStatus: string
  onConfirm: (newStatus: string) => void
  onClose: () => void
}

function EssayUpdateStatusModal({ essayId, currentStatus, onConfirm, onClose }: EssayUpdateStatusModalProps) {
  const [status, setStatus] = useState(currentStatus)
  const mutation = useUpdateEssay()

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  const handleConfirm = async () => {
    const loadingId = toast.loading('Update status...')
    try {
      await mutation.mutateAsync({
        id: essayId,
        data: {
          status: status as ContentStatus
        }
      })

      toast.success('Update status successfully', { id: loadingId })
    } catch (error) {
      console.error('Facebook login failed:', error)
      toast.error('Update status failed', { id: loadingId })
    }

    if (onConfirm) {
      onConfirm(status)
    }

    onClose()
  }

  return (
    <Box sx={{ width: 400, p: 3 }}>
      <Typography
        variant='h6'
        component='h2'
        id='modal-title'
        sx={{ display: 'inline-flex', alignItems: 'center' }}
        gutterBottom
      >
        <SwapHorizIcon fontSize='medium' sx={{ marginRight: 1 }} />
        Change Status
      </Typography>
      <Typography id='modal-description' sx={{ mb: 2 }}>
        Select the new status to change
      </Typography>
      <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
        <Select name='' placeholder='Status' value={status} onChange={handleStatusChange}>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </AppButton>
        <AppButton onClick={handleConfirm} variant='contained' color='primary'>
          Confirm
        </AppButton>
      </Box>
    </Box>
  )
}

export default EssayUpdateStatusModal
