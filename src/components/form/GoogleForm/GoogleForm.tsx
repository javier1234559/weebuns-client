import {
  CodeResponse,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
  useGoogleOneTapLogin
} from '@react-oauth/google'
import toast from 'react-hot-toast'

import './GoogleForm.scss'

import { AppIcon } from '~/components/common/AppIcon'
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
  const handleGoogleResponse = async (response: CredentialResponse | TokenResponse | CodeResponse) => {
    if ('access_token' in response) {
      const result = await authApi.loginGoogle(response.access_token)

      onSubmit(result)
      return
    }
    console.error('Google One Tap login failed:', response)
    toast.error('Google login failed. Please try again.')
  }

  const handleError = () => {
    toast('Failed to retrieve access token from Facebook', {
      icon: '🤕'
    })
  }

  const login = useGoogleLogin({
    onSuccess: handleGoogleResponse,
    onError: handleError
  })

  useGoogleOneTapLogin({
    onSuccess: handleGoogleResponse,
    onError: handleError
  })

  return (
    <button className='custom-google-btn' onClick={() => login()}>
      <AppIcon icon='google' style={{ marginRight: 4 }} />
      <span>Login with Google</span>
    </button>
  )
}

export default GoogleForm
