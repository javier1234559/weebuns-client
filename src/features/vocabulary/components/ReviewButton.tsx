import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

import AppButton from '~/components/common/AppButton'
import WarningModal from '~/components/modal/WarningModal'
import { useModal } from '~/contexts/ModalContext'
import QuizModal from '~/features/vocabulary/modal/QuizModal'
import { RootState } from '~/store/store'

function ReviewButton() {
  const { openModal } = useModal()
  const selectedVocabList = useSelector((state: RootState) => state.vocab.selectedVocabList)

  const openQuizModal = () => {
    if (selectedVocabList.length === 0) {
      openWarningModal()
      return
    }
    openModal(QuizModal, { data: selectedVocabList })
  }

  const openWarningModal = () => {
    openModal(WarningModal, { message: 'You have not selected any vocabulary to review.' })
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
