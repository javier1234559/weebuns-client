import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import EmailForm from '~/features/auth/components/EmailForm'
import RecoveryCodeForm from '~/features/auth/components/RecoveryCodeForm'
import ResetPasswordForm from '~/features/auth/components/ResetPasswordForm'
import authApi from '~/features/auth/services/authApi'
import { RouteNames } from '~/router/route-name'

type ForgotPasswordStep = 'email' | 'code' | 'reset'

const STEPS: { [key in ForgotPasswordStep]: number } = {
  email: 0,
  code: 1,
  reset: 2
}

const STEP_LABELS: { [key in ForgotPasswordStep]: string } = {
  email: 'Email',
  code: 'Verification',
  reset: 'New Password'
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const formTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

function ForgotPasswordView() {
  // const navigate = useNavigate()
  // const [searchParams] = useSearchParams()
  // const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email')
  // const [email, setEmail] = useState(searchParams.get('email') || '')
  // const [canNavigateToStep, setCanNavigateToStep] = useState({
  //   email: true,
  //   code: false,
  //   reset: false
  // })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email')
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [isLoading, setIsLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [canNavigateToStep, setCanNavigateToStep] = useState({
    email: true,
    code: false,
    reset: false
  })

  const handleStepClick = (step: ForgotPasswordStep) => {
    if (canNavigateToStep[step] && STEPS[step] < STEPS[currentStep]) {
      setCurrentStep(step)
    }
  }

  const handleEmailSubmit = async (submittedEmail: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.requestResetPass({
        email: submittedEmail
      })

      if (response) {
        setEmail(submittedEmail)
        setCurrentStep('code')
        setCanNavigateToStep((prev) => ({ ...prev, code: true }))
        toast.success('Recovery code sent to your email')
      }
    } catch (error) {
      toast.error('Failed to send recovery code')
      console.error('Failed to send recovery code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (code: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.verifyResetPass({
        email,
        code
      })

      if (response) {
        setVerificationCode(code) // Save code for final password reset
        setCurrentStep('reset')
        setCanNavigateToStep((prev) => ({ ...prev, reset: true }))
        toast.success('Code verified successfully')
      }
    } catch (error) {
      toast.error('Invalid verification code')
      console.error('Invalid verification code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setIsLoading(true)
      const response = await authApi.requestResetPass({
        email
      })

      if (response) {
        toast.success('Recovery code resent to your email')
      }
    } catch (error) {
      toast.error('Failed to resend code')
      console.error('Failed to resend code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (newPassword: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.resetPassword({
        email,
        code: verificationCode,
        newPassword
      })

      if (response) {
        toast.success('Password reset successfully')
        navigate(RouteNames.Login)
      }
    } catch (error) {
      toast.error('Failed to reset password')
      console.error('Failed to reset password:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <motion.div
        initial='initial'
        animate='animate'
        exit='exit'
        variants={pageTransition}
        transition={{ duration: 0.4 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 450,
            minHeight: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Typography variant='h4' align='center' mb={4}>
              Reset Password
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: 4,
              px: 2
            }}
          >
            {Object.entries(STEPS).map(([step, index]) => (
              <Box
                key={step}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  flex: 1
                }}
              >
                <motion.div
                  animate={{
                    scale: currentStep === step ? 1.1 : 1,
                    opacity: canNavigateToStep[step as ForgotPasswordStep] ? 1 : 0.5
                  }}
                  style={{ cursor: canNavigateToStep[step as ForgotPasswordStep] ? 'pointer' : 'default' }}
                  onClick={() => handleStepClick(step as ForgotPasswordStep)}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: (theme) =>
                        currentStep === step
                          ? 'success.main'
                          : canNavigateToStep[step as ForgotPasswordStep]
                            ? 'success.light'
                            : 'grey.300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      '&:hover': canNavigateToStep[step as ForgotPasswordStep]
                        ? {
                            bgcolor: (theme) => (currentStep === step ? 'success.dark' : 'success.main')
                          }
                        : {}
                    }}
                  >
                    {index + 1}
                  </Box>
                </motion.div>
                <Typography
                  variant='body2'
                  color={currentStep === step ? 'success.main' : 'text.secondary'}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: currentStep === step ? 500 : 400
                  }}
                >
                  {STEP_LABELS[step as ForgotPasswordStep]}
                </Typography>
              </Box>
            ))}
          </Box>

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial='initial'
              animate='animate'
              exit='exit'
              variants={formTransition}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {currentStep === 'email' && <EmailForm initialEmail={email} onSubmit={handleEmailSubmit} />}
              {currentStep === 'code' && <RecoveryCodeForm onSubmit={handleCodeSubmit} onResend={handleResendCode} />}
              {currentStep === 'reset' && <ResetPasswordForm onSubmit={handlePasswordReset} />}
            </motion.div>
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  )
}

export default ForgotPasswordView
