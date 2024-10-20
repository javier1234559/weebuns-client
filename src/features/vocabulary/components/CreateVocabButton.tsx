import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import AppButton from '~/components/common/AppButton'
import { RootState } from '~/store/store'

function CreateVocabButton() {
  const space = useSelector((state: RootState) => state.space.currentSpace)

  const navigateToCreateVocabulary = () => {
    if (!space) {
      toast.error('Please select a space first')
      return
    }

    if (!space?.id) {
      toast.error('Space ID is not available')
      return
    }

    // const linkToNavigate = replacePathId(RouteNames.VocabularyCreate, space.id)
    // navigate(linkToNavigate)
  }

  return (
    <AppButton variant='black' onClick={navigateToCreateVocabulary}>
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

export default CreateVocabButton
