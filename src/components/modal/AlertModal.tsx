import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/common/AppButton'

interface AlertConfirmModalProps {
  message: string
  onConfirm: () => void
  onClose: () => void
}

function AlertConfirmModal({ message, onConfirm, onClose }: AlertConfirmModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant='h6' component='h2' id='modal-title'>
        Confirm
      </Typography>
      <Typography id='modal-description' sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton onClick={onClose} sx={{ mr: 1 }}>
          No
        </AppButton>
        <AppButton onClick={handleConfirm} variant='black'>
          Yes
        </AppButton>
      </Box>
    </Box>
  )
}

export default AlertConfirmModal
