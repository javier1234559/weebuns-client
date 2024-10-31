import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/common/AppButton'

interface DeleteModalProps {
  itemName?: string
  id: string
  onConfirm: () => void
  onClose: () => void
}

function DeleteModal({ itemName, onConfirm, onClose }: DeleteModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant='h6' component='h2' id='modal-title'>
        Confirm Deletion
      </Typography>
      <Typography id='modal-description' sx={{ mt: 2 }}>
        Are you sure you want to delete {itemName}?
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </AppButton>
        <AppButton onClick={handleConfirm} variant='contained' color='error'>
          Delete
        </AppButton>
      </Box>
    </Box>
  )
}

export default DeleteModal
