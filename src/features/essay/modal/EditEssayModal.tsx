import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

import AppButton from '~/components/common/AppButton'

interface EditEssayModalProps {
  itemId: string
  onConfirm: () => void
  onClose: () => void
}

function EditEssayModal({ itemId, onConfirm, onClose }: EditEssayModalProps) {
  console.log(itemId) //handle fetch api to fill data to this form

  const handlePublish = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  const handleCancelAndSaveDraft = () => {
    onClose()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Essay</Typography>
      </Box>

      {/* EditEssayFormView */}
      {/* <CreateEssayForm control=null /> */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <AppButton sx={{ marginRight: 1 }} onClick={handleCancelAndSaveDraft}>
          Cancel
        </AppButton>
        <AppButton onClick={handlePublish} variant='contained' color='primary'>
          Publish
        </AppButton>
      </Box>
    </Box>
  )
}

export default memo(EditEssayModal)
