import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import { Select, SelectItem } from '~/components/ui/select'
import { AuthResponse } from '~/features/auth/auth.type'
import authApi from '~/features/auth/services/authApi'
import { LANGUAGE_LABELS } from '~/features/space/space.constants'
import { LanguageCode } from '~/features/space/space.type'
import { useLoadingToast } from '~/hooks/useLoadingToast'
import { RegisterDto } from '~/services/api/api-axios'
import logOnDev from '~/utils/log-on-dev'

type RegisterFormData = RegisterDto & { confirmPassword: string }

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  nativeLanguage: yup
    .string()
    .required('Please select a language')
    .oneOf(Object.values(LanguageCode), 'Please select a valid language') as yup.Schema<string>,
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

interface RegisterFormProps {
  onSubmit: (data: AuthResponse) => void
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      nativeLanguage: ''
    }
  })

  const { runWithLoading } = useLoadingToast()

  const handleFormSubmit = async (data: RegisterFormData) => {
    logOnDev(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data

    try {
      const result = await runWithLoading(() => authApi.register(registerData), {
        loadingMessage: 'Registering...',
        successMessage: 'Successfully registered',
        errorMessage: 'Registration failed. Please try again.'
      })
      if (result) {
        onSubmit(result)
      }
    } catch (error) {
      console.error('Registration failed:', error)
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
      <Controller
        name='nativeLanguage'
        control={control}
        render={({ field }) => (
          <Select {...field} placeholder='Choose your native language'>
            {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      {errors.nativeLanguage && (
        <Typography color='error' variant='caption' sx={{ mt: 1 }}>
          {errors.nativeLanguage.message}
        </Typography>
      )}
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
