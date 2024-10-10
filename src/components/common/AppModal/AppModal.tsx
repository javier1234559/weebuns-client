import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'

import AppButton from '~/components/common/AppButton'
import { closeModal } from '~/store/modalSlice'
import { RootState } from '~/store/store'

const ConfirmModal: React.FC = () => {
  const dispatch = useDispatch()
  const { confirmText, cancelText, onConfirm } = useSelector((state: RootState) => state.modal)

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    dispatch(closeModal())
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

  return (
    <Box>
      <Typography variant='body1' gutterBottom>
        Are you sure you want to proceed?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <AppButton onClick={handleCancel} sx={{ mr: 1 }}>
          {cancelText}
        </AppButton>
        <AppButton onClick={handleConfirm} variant='contained' color='primary'>
          {confirmText}
        </AppButton>
      </Box>
    </Box>
  )
}

const AppModal: React.FC = () => {
  const dispatch = useDispatch()
  const { isOpen, content, title, isConfirm } = useSelector((state: RootState) => state.modal)

  const handleClose = () => dispatch(closeModal())

  const modalContent = isConfirm ? <ConfirmModal /> : content

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'var(--login-bg-custom)',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        {title && (
          <Typography id='modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
        )}
        <Box id='modal-description' sx={{ mt: 2 }}>
          {modalContent}
        </Box>
      </Box>
    </Modal>
  )
}

export default AppModal
