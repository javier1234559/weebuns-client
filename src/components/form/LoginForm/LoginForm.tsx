import { yupResolver } from '@hookform/resolvers/yup'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import { useLoadingToast } from '~/hooks/useLoadingToast'
import { LoginDto } from '~/services/api-axios'
import authApi from '~/services/auth'
import { AuthResponse } from '~/types/auth'
import logOnDev from '~/utils/log-on-dev'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  rememberMe: yup.boolean().optional()
})

interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

interface LoginFormProps {
  onSubmit: (data: AuthResponse) => void
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      rememberMe: localStorage.getItem('rememberMe') === 'true'
    }
  })
  const { runWithLoading } = useLoadingToast()

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    const rememberMe = localStorage.getItem('rememberMe') === 'true'

    if (rememberedEmail && rememberMe) {
      setValue('email', rememberedEmail)
      setValue('rememberMe', true)
    }
  }, [setValue])

  const handleFormSubmit = async (data: LoginFormData) => {
    if (data.rememberMe) {
      localStorage.setItem('rememberedEmail', data.email)
      localStorage.setItem('rememberMe', 'true')
    } else {
      localStorage.removeItem('rememberedEmail')
      localStorage.removeItem('rememberMe')
    }

    logOnDev(data)

    try {
      const result = await runWithLoading(() => authApi.login(data as LoginDto), {
        loadingMessage: 'Logging in...',
        successMessage: 'Successfully logged in',
        errorMessage: 'Login failed. Please try again.'
      })
      if (result) {
        onSubmit(result)
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        {...register('email')}
        margin='normal'
        fullWidth
        label='Email Address'
        name='email'
        // autoComplete='email'
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        margin='normal'
        fullWidth
        name='password'
        label='Password'
        type='password'
        // autoComplete='current-password'
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <FormControlLabel control={<Checkbox {...register('rememberMe')} color='primary' />} label='Remember me' />
      <AppButton type='submit' fullWidth variant='black' sx={{ mt: 3, mb: 2, py: 2 }}>
        Login
      </AppButton>
    </form>
  )
}

export default LoginForm
