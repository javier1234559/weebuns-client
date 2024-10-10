import './GoogleForm.scss'

import { CodeResponse, CredentialResponse, TokenResponse, useGoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'

import { AppIcon } from '~/components/common/AppIcon'
import { useLoadingToast } from '~/hooks/useLoadingToast'
import authApi from '~/services/auth'
import { AuthResponse } from '~/types/auth'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          cancel: () => void
        }
      }
    }
  }
}

interface GoogleFormProps {
  onSubmit: (data: AuthResponse) => void
}

function GoogleForm({ onSubmit }: GoogleFormProps) {
  const { runWithLoading } = useLoadingToast()

  const handleGoogleResponse = async (response: CredentialResponse | TokenResponse | CodeResponse) => {
    if ('access_token' in response) {
      try {
        const result = await runWithLoading(() => authApi.loginGoogle(response.access_token), {
          loadingMessage: 'Logging in with Google...',
          successMessage: 'Successfully logged in with Google',
          errorMessage: 'Google login failed. Please try again.'
        })
        onSubmit(result)
      } catch (error) {
        console.error('Google One Tap login failed:', error)
      }
    } else {
      console.error('Google One Tap login failed:', response)
      toast.error('Google login failed. Please try again.')
    }
  }

  const handleError = () => {
    toast.error('Failed to retrieve access token from Google', {
      icon: '🤕'
    })
  }

  const login = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleError,
    flow: 'implicit'
  })

  // useGoogleOneTapLogin({
  //   onSuccess: handleGoogleResponse,
  //   onError: handleError,
  //   useOneTap: true,
  //   promptMomentNotification: undefined
  // })

  return (
    <button className='custom-google-btn' onClick={() => login()}>
      <AppIcon icon='google' style={{ marginRight: 4 }} />
      <span>Login with Google</span>
    </button>
  )
}

export default GoogleForm
