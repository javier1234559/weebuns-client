import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CircleAlert } from 'lucide-react'

import AppButton from '~/components/common/AppButton'

interface WarningModalProps {
  message: string
  onConfirm: () => void
  onClose: () => void
}

function WarningModal({ message, onConfirm, onClose }: WarningModalProps) {
  const theme = useTheme()
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <Box sx={{ width: 300, p: 3 }}>
      <Typography variant='h6' component='h2' id='modal-title' sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleAlert color={theme.palette.warning.light} style={{ marginRight: theme.spacing(1) }} />
        Warning
      </Typography>
      <Typography id='modal-description' sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </AppButton>
        <AppButton onClick={handleConfirm} variant='black'>
          Ok
        </AppButton>
      </Box>
    </Box>
  )
}

export default WarningModal
