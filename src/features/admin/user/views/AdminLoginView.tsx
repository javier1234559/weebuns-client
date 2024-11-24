import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import useLogin from '~/features/auth/hooks/useLogin'
import authApi from '~/features/auth/services/authApi'
import { useLoadingToast } from '~/hooks/useLoadingToast'
import { RouteNames } from '~/router/route-name'
import { LoginDto } from '~/services/api/api-axios'
import { COLOR_PRIMARY } from '~/theme/colors'

interface AdminLoginFormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
})

function AdminLoginView() {
  const { handleLogin } = useLogin()
  const { runWithLoading } = useLoadingToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AdminLoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      const result = await runWithLoading(() => authApi.login(data as LoginDto), {
        loadingMessage: 'Logging in...',
        successMessage: 'Successfully logged in',
        errorMessage: 'Login failed. Please try again.'
      })
      if (result) {
        handleLogin(result)
        window.location.href = RouteNames.AdminDashboard
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: ``,
        py: 4
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            mx: 2,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}
          >
            <motion.img
              src='/react.svg'
              alt='Admin Logo'
              style={{
                width: 'auto',
                height: '40px',
                marginBottom: '1rem'
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Typography variant='h5' component='h1' gutterBottom fontWeight='bold'>
                Admin Login
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Typography variant='body2' color='textSecondary' align='center'>
                Please sign in to access the admin dashboard
              </Typography>
            </motion.div>
          </Box>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TextField
              {...register('email')}
              margin='normal'
              fullWidth
              label='Email Address'
              type='email'
              autoComplete='email'
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />

            <TextField
              {...register('password')}
              margin='normal'
              fullWidth
              label='Password'
              type='password'
              autoComplete='current-password'
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <AppButton
                type='submit'
                fullWidth
                variant='black'
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  bgcolor: COLOR_PRIMARY.main,
                  color: COLOR_PRIMARY.contrastText,
                  boxShadow: `0 3px 5px 2px ${COLOR_PRIMARY.main}40`,
                  '&:hover': {
                    bgcolor: COLOR_PRIMARY.dark,
                    boxShadow: `0 4px 6px 3px ${COLOR_PRIMARY.main}30`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign In
              </AppButton>
            </motion.div>
          </motion.form>
        </Paper>
      </motion.div>
    </Box>
  )
}

AdminLoginView.displayName = 'AdminLoginView'
export default AdminLoginView
