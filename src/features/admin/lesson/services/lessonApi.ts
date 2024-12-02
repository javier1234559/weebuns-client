import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const lessonApi = {
  getById(id: string) {
    return api
      .lessonControllerGetLesson(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default lessonApi
