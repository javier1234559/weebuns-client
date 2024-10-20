import './Register.scss'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import FaceBookForm from '~/features/auth/components/FacebookForm/FaceBookForm'
import GoogleForm from '~/features/auth/components/GoogleForm/GoogleForm'
import RegisterForm from '~/features/auth/components/RegisterForm/RegisterForm'
import useRegister from '~/features/auth/hooks/useRegister'

function Register() {
  const { handleRegister } = useRegister()

  return (
    <Container>
      <Box className='register-page'>
        <Box>
          <Box className='banner' sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img
              src='/images/banner-login.png'
              alt='login'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
          <Box className='form-login'>
            <Typography variant='h3'>Register</Typography>
            <Typography variant='body2' color='textSecondary' fontSize='1.2rem'>
              Hi there , let’s improve languages together
            </Typography>
            <Box display='flex' flexDirection='column' my={2} gap={2}>
              <GoogleForm onSubmit={handleRegister} />
              <FaceBookForm onSubmit={handleRegister} />
            </Box>
            <RegisterForm onSubmit={handleRegister} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
