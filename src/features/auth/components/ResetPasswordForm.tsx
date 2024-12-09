import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'

import AppButton from '~/components/common/AppButton'

interface ResetPasswordFormProps {
  onSubmit: (password: string) => void
}

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const password = watch('password')

  return (
    <Box component='form' onSubmit={handleSubmit((data) => onSubmit(data.password))}>
      <TextField
        fullWidth
        type='password'
        label='New Password'
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message as string}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type='password'
        label='Confirm Password'
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match'
        })}
        error={!!errors.confirmPassword}
        helperText={errors.password?.message as string}
        sx={{ mb: 2 }}
      />
      <AppButton type='submit' variant='black' fullWidth size='large'>
        Reset Password
      </AppButton>
    </Box>
  )
}

export default ResetPasswordForm
