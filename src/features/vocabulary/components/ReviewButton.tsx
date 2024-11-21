import Typography from '@mui/material/Typography'

import AppButton from '~/components/common/AppButton'
import { useModal } from '~/contexts/ModalContext'
import { MOCK_VOCABULARIES } from '~/features/vocabulary/mocks/MOCK_VOCABULARIES'
import QuizModal from '~/features/vocabulary/modal/QuizModal'

function ReviewButton() {
  const { openModal } = useModal()

  const openQuizModal = () => {
    openModal(QuizModal, { data: MOCK_VOCABULARIES })
  }
  return (
    <AppButton variant='black' onClick={openQuizModal}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Review
      </Typography>
    </AppButton>
  )
}

export default ReviewButton
