import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const courseApi = {
  getAllCourseJoined(
    id: string,
    query: {
      page: number
      perPage: number
    }
  ) {
    return api
      .spaceControllerGetSpaceCourses(id, query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAllCoursePublished() {
    // return api
    //   .cour()
    //   .then((res) => res.data)
    //   .catch((err) => {
    //     handleApiError(err)
    //     throw err.response.data
    //   })
  },
  getRecommendedCourses() {
    return api
      .spaceControllerGetRecommendedCourses()
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default courseApi
