import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import toast from 'react-hot-toast'

import './FaceBookForm.scss'

import { globalConfig } from '~/config'
import authApi from '~/services/auth'
import { AuthResponse } from '~/types/auth'

interface FaceBookFormProps {
  onSubmit: (data: AuthResponse) => void
}

function FaceBookForm({ onSubmit }: FaceBookFormProps) {
  const APP_ID = globalConfig.FACEBOOK_APP_ID

  const handleFacebookCallback = async (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in userInfo) {
      const result = await authApi.loginFacebook(userInfo.accessToken)

      if (result) {
        onSubmit(result)
      }
    } else {
      toast.error('Failed to retrieve access token from Facebook')
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
