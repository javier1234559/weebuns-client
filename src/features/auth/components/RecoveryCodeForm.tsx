import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { OtpInput } from 'reactjs-otp-input'

import AppButton from '~/components/common/AppButton'

interface RecoveryCodeFormProps {
  onSubmit: (code: string) => void
  onResend: () => void
}

function RecoveryCodeForm({ onSubmit, onResend }: RecoveryCodeFormProps) {
  const theme = useTheme()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch
  } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const code = watch('code')

  const handleFormSubmit = (data: { code: string }) => {
    if (!data.code || data.code.length !== 6) {
      setError('code', {
        type: 'validate',
        message: 'Please enter a 6-digit code'
      })
      return
    }
    onSubmit(data.code)
  }

  const handleCodeChange = (value: string) => {
    setValue('code', value)
    if (value.length === 6) {
      clearErrors('code')
    }
    if (value.length < 6) {
      setError('code', {
        type: 'validate',
        message: 'Please enter a 6-digit code'
      })
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant='body2' mb={2}>
        We&apos;ve sent a recovery code to your email. Please enter it below.
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyItems: 'center' }}>
        <Box mx='auto'>
          <OtpInput
            value={code}
            onChange={handleCodeChange}
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{
              width: '40px',
              height: '40px',
              margin: '0 4px',
              fontSize: '16px',
              borderRadius: theme.shape.borderRadius,
              border: `1px solid ${errors.code ? theme.palette.error.main : theme.palette.divider}`,
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              transition: theme.transitions.create(['border-color'])
            }}
            shouldAutoFocus
          />
          {errors.code && (
            <Typography color='error' variant='caption' sx={{ mt: 2, mb: 0, display: 'block', textAlign: 'center' }}>
              {errors.code.message}
            </Typography>
          )}
        </Box>
      </Box>

      <AppButton type='submit' variant='black' fullWidth size='large' sx={{ mb: 2 }}>
        Verify Code
      </AppButton>
      <AppButton variant='outlined' fullWidth onClick={onResend}>
        Resend Code
      </AppButton>
    </Box>
  )
}

export default RecoveryCodeForm
