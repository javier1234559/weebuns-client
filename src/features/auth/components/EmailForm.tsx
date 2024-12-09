import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'

import AppButton from '~/components/common/AppButton'

interface EmailFormProps {
  initialEmail: string
  onSubmit: (email: string) => void
}

function EmailForm({ initialEmail, onSubmit }: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: initialEmail
    }
  })

  return (
    <Box component='form' onSubmit={handleSubmit((data) => onSubmit(data.email))}>
      <TextField
        fullWidth
        label='Email'
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.main'
            }
          }
        }}
      />

      <AppButton type='submit' variant='black' fullWidth size='large'>
        Send Recovery Code
      </AppButton>
    </Box>
  )
}

export default EmailForm
