import { SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { AppButton } from '~/components/common/AppButton'

interface ChangeStatusModalProps {
  idItem: string
  currentStatus: string
  onConfirm: (newStatus: string) => void
  onClose: () => void
}

function ChangeStatusModal({ idItem, currentStatus, onConfirm, onClose }: ChangeStatusModalProps) {
  const [status, setStatus] = useState(currentStatus)

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  const handleConfirm = () => {
    onConfirm(status)
    onClose()
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant='h6' component='h2' id='modal-title' gutterBottom>
        Change Status
      </Typography>
      <Typography id='modal-description' sx={{ mt: 2, mb: 2 }}>
        Select the new status for change: {idItem}
      </Typography>
      <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
        <InputLabel id='status-select-label'>Status</InputLabel>
        <Select
          labelId='status-select-label'
          id='status-select'
          value={status}
          label='Status'
          onChange={handleStatusChange}
        >
          <MenuItem value='publish'>Publish</MenuItem>
          <MenuItem value='private'>Private</MenuItem>
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

export default ChangeStatusModal
