import { LoginDto, RegisterDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const authApi = {
  login(form: LoginDto) {
    return api
      .authControllerLogin(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  register(form: RegisterDto) {
    return api
      .authControllerRegister(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  loginGoogle(accessToken: string) {
    return api
      .authControllerLoginWithGoogle({ accessToken })
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  loginFacebook(accessToken: string) {
    return api
      .authControllerLoginWithFacebook({ accessToken })
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  getCurrentUser() {
    return api.authControllerMe().catch((err) => {
      handleApiError(err)
      return null
    })
  },
  logout() {
    return api.authControllerLogout().catch((err) => {
      handleApiError(err)
      return null
    })
  }
}

export default authApi
