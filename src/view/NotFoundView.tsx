import { useNavigate } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import AppView from '~/components/common/AppView'
import AppLink from '~/components/common/AppLink'
import AppButton from '~/components/common/AppButton'

/**
 * "Not Found" aka "Error 404" view
 * url: any unknown :)
 * @page NotFoundView
 */
const NotFoundView = () => {
  const navigate = useNavigate()

  const onClose = () => {
    navigate('/', { replace: true })
  }

  return (
    <AppView>
      <Typography variant='h3'>Page not found!</Typography>
      <Typography variant='body1'>
        Requested address is unknown, please check your URL or go to the <AppLink to='/'>home page</AppLink>.
      </Typography>
      {/* <AppAlert severity='error' onClose={onClose}>
        Error 404 - Page not found
      </AppAlert> */}
      <Stack direction='row' justifyContent='center'>
        <AppButton onClick={onClose}>Go to Home Page</AppButton>
      </Stack>
    </AppView>
  )
}

export default NotFoundView
