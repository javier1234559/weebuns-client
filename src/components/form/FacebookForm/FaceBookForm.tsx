import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login'
import { globalConfig } from '~/config'
import './FaceBookForm.scss'

function FaceBookForm() {
  const APP_ID = globalConfig.FACEBOOK_APP_ID

  const handleFacebookCallback = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('status' in userInfo) {
      console.error('Sorry!', 'Something went wrong with facebook Login.')
      return
    }
    console.log(userInfo)
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
