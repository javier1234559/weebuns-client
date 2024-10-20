import './Login.scss'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import FaceBookForm from '~/features/auth/components/FacebookForm/FaceBookForm'
import GoogleForm from '~/features/auth/components/GoogleForm/GoogleForm'
import LoginForm from '~/features/auth/components/LoginForm/LoginForm'
import useLogin from '~/features/auth/hooks/useLogin'

function LoginView() {
  const { handleLogin } = useLogin()

  return (
    <Box className='login-page'>
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
          <Typography variant='h3'>Login</Typography>
          <Typography variant='body2' color='textSecondary' fontSize='1.2rem'>
            Hi there , let’s improve languages together
          </Typography>
          <Box display='flex' flexDirection='column' my={2} gap={2}>
            <GoogleForm onSubmit={handleLogin} />
            <FaceBookForm onSubmit={handleLogin} />
          </Box>
          <LoginForm onSubmit={handleLogin} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginView
