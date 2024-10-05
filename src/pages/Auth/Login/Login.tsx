import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FaceBookForm from '~/components/form/FacebookForm/FaceBookForm'
import GoogleForm from '~/components/form/GoogleForm/GoogleForm'
import LoginForm from '~/components/form/LoginForm/LoginForm'
import { LoginDto } from '~/services/api-axios'
import authApi from '~/services/auth'
import { login } from '~/store/authSlice'
import { RouteNames } from '~/types/contains'
import './Login.scss'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: unknown) => {
    console.log(data)
    const res = await authApi.login(data as LoginDto)
    if (res) {
      console.log(res)
      dispatch(
        login({
          id: res.user.id,
          email: res.user.email,
          name: `${res.user.first_name} ${res.user.last_name}`,
          avatar_img: res.user.profile_picture,
          accessToken: res.access_token,
          role: res.user.role
        })
      )

      navigate(RouteNames.Auth)
    }
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
              <GoogleForm />
              <FaceBookForm />
            </Box>
            <LoginForm onSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
