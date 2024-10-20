import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'
import { replacePathId } from '~/utils/replace-path'

function CreateEssayButton() {
  const space = useSelector((state: RootState) => state.space.currentSpace)
  const navigate = useNavigate()

  const navigateToCreateEssay = () => {
    if (!space) {
      toast.error('Please select a space first')
      return
    }

    if (!space?.id) {
      toast.error('Space ID is not available')
      return
    }

    const linkToNavigate = replacePathId(RouteNames.EssayCreate, space.id)
    navigate(linkToNavigate)
  }

  return (
    <AppButton variant='black' onClick={navigateToCreateEssay}>
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

export default CreateEssayButton
