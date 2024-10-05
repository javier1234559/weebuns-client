import {
  CodeResponse,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
  useGoogleOneTapLogin
} from '@react-oauth/google'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppIcon } from '~/components/common/AppIcon'
import './GoogleForm.scss'

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

function GoogleForm() {
  const navigate = useNavigate()

  const handleGoogleResponse = async (response: CredentialResponse | TokenResponse | CodeResponse) => {
    console.log('Google One Tap login successful', response)

    try {
      // Here you would typically send the credential to your backend
      // const authResponse = await authApi.verifyAndSignIn({
      //   credential: credentialResponse.credential
      // });

      toast.success('Sign in successful. Redirecting to home page.')
      navigate('/')
    } catch (error) {
      console.error('Sign in failed:', error)
      toast.error('Sign in failed. Please try again.')
    }
  }

  const handleError = () => {
    toast.error('Google login failed.')
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
      <span>Sign in with Google</span>
    </button>
  )
}

export default GoogleForm
