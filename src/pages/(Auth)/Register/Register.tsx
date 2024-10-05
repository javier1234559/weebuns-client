import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import './Register.scss'

import FaceBookForm from '~/components/form/FacebookForm/FaceBookForm'
import GoogleForm from '~/components/form/GoogleForm/GoogleForm'
import RegisterForm from '~/components/form/RegisterForm/RegisterForm'
import { RouteNames } from '~/router/route-name'
import { login } from '~/store/authSlice'
import { AuthResponse } from '~/types/auth'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (data: AuthResponse) => {
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
    toast.success('Register successfully! Redirecting to dashboard...')
    navigate(RouteNames.Dashboard)
  }

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
