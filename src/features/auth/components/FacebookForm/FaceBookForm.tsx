import './FaceBookForm.scss'

import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'

import { globalConfig } from '~/config'
import { AuthResponse } from '~/features/auth/auth.type'
import authApi from '~/features/auth/services/authApi'
import { useLoadingToast } from '~/hooks/useLoadingToast'
import logOnDev from '~/utils/log-on-dev'

interface FaceBookFormProps {
  onSubmit: (data: AuthResponse) => void
}

function FaceBookForm({ onSubmit }: FaceBookFormProps) {
  const APP_ID = globalConfig.FACEBOOK_APP_ID
  const { runWithLoading } = useLoadingToast()

  const handleFacebookCallback = async (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in userInfo) {
      try {
        const result = await runWithLoading(() => authApi.loginFacebook(userInfo.accessToken), {
          loadingMessage: 'Logging in with Facebook...',
          successMessage: 'Successfully logged in',
          errorMessage: 'Failed to log in with Facebook'
        })
        logOnDev('Facebook login successful:', JSON.stringify(result))
        onSubmit(result)
      } catch (error) {
        console.error('Facebook login failed:', error)
      }
    }
  }

  return (
    <FacebookLogin
      icon='fa-facebook'
      buttonStyle={{ padding: '6px' }}
      appId={APP_ID} // we need to get this from facebook developer console by setting the app.
      autoLoad={false}
      fields='name,email,picture'
      callback={handleFacebookCallback}
    />
  )
}

export default FaceBookForm
