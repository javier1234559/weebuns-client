import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import { RegisterDto } from '~/services/api-axios'
import authApi from '~/services/auth'
import { AuthResponse } from '~/types/auth'
import logOnDev from '~/utils/log-on-dev'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required')
})

type RegisterFormData = RegisterDto & { confirmPassword: string }

interface RegisterFormProps {
  onSubmit: (data: AuthResponse) => void
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (data: RegisterFormData) => {
    logOnDev(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data
    const result = await authApi.register(registerData)
    if (result) {
      onSubmit(result)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            {...register('firstName')}
            margin='normal'
            fullWidth
            label='First Name'
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('lastName')}
            margin='normal'
            fullWidth
            label='Last Name'
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
      </Grid>
      <TextField
        {...register('username')}
        margin='normal'
        fullWidth
        label='Username'
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        {...register('email')}
        margin='normal'
        fullWidth
        label='Email Address'
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        margin='normal'
        fullWidth
        label='Password'
        type='password'
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        margin='normal'
        fullWidth
        label='Confirm Password'
        type='password'
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <AppButton type='submit' fullWidth variant='black' sx={{ mt: 3, mb: 2, py: 2 }}>
        Register
      </AppButton>
    </form>
  )
}

export default RegisterForm
