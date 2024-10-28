import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'

function CreateEssayButton() {
  const navigate = useNavigate()

  const navigateToCreateEssay = () => {
    navigate(RouteNames.EssayCreate)
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
