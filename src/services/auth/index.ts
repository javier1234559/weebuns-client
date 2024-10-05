import { LoginDto } from '~/services/api-axios'
import api from '~/services/axios'
// import { AuthResponse } from '~/types/auth'
import { handleApiError } from '~/utils/handle-api-error'

const authApi = {
  login(form: LoginDto): Promise<any> {
    return api
      .authControllerLogin(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
    // .post('/auth/login', form)
    // .then((res) => res.data)
    // .catch((err) => {
    //   handleApiError(err)
    //   throw err.response.data
    // })
  },
  getCurrentUser() {
    return api.authControllerMe().catch((err) => {
      handleApiError(err)
      return null
    })
    // .get('/auth/me')
    // .then((res) => res.data)
    // .catch((err) => {
    //   handleApiError(err)
    //   return null
    // })
  }
}

export default authApi
