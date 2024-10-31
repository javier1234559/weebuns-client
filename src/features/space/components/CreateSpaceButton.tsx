import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

import AppButton from '~/components/common/AppButton'
import { useModal } from '~/contexts/ModalContext'
import CreateSpaceModal from '~/features/space/modal/CreateSpaceModal'
import { RootState } from '~/store/store'

function CreateSpaceButton() {
  const idUser = useSelector<RootState>((state) => state.auth.id)
  const { openModal } = useModal()

  const createSpacePopUp = () => {
    openModal(CreateSpaceModal, { idUser })
  }

  return (
    <AppButton variant='black' onClick={createSpacePopUp}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Create
      </Typography>
    </AppButton>
  )
}

export default CreateSpaceButton
