import './Login.scss'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FaceBookForm from '~/components/form/FacebookForm/FaceBookForm'
import GoogleForm from '~/components/form/GoogleForm/GoogleForm'
import LoginForm from '~/components/form/LoginForm/LoginForm'
import { RouteNames } from '~/router/route-name'
import { login } from '~/store/authSlice'
import { AuthResponse } from '~/types/auth'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (data: AuthResponse) => {
    dispatch(
      login({
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.first_name} ${data.user.last_name}`,
        avatar_img: data.user.profile_picture,
        accessToken: data.access_token,
        role: data.user.role
      })
    )

    toast.success('Login successfully! Redirecting to dashboard...')
    navigate(RouteNames.Dashboard)
  }

  return (
    <Container>
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
    </Container>
  )
}

export default Login
