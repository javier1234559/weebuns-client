import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import AppLink from '~/components/common/AppLink'

function NotFound() {
  const navigate = useNavigate()

  const onClose = () => {
    navigate('/', { replace: true })
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <Typography variant='h1'>Page not found!</Typography>
      <Typography variant='body1'>
        Requested address is unknown, please check your URL or go to the <AppLink to='/'>home page</AppLink>.
      </Typography>
      <Stack direction='row' justifyContent='center'>
        <AppButton variant='black' onClick={onClose}>
          Go to Home Page
        </AppButton>
      </Stack>
    </Container>
  )
}

export default NotFound
