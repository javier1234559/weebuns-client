import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'

function CreateCourseButton() {
  const navigate = useNavigate()

  const navigateToJoinCourse = () => {
    navigate(RouteNames.AdminCourseManagerCreate)
  }

  return (
    <AppButton variant='black' onClick={navigateToJoinCourse}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Create Course
      </Typography>
    </AppButton>
  )
}

export default CreateCourseButton
