import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const statsApi = {
  statsActivityStreak() {
    return api
      .statsControllerGetUserActivityStreak()
      .then((data) => data.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  statsOverview() {
    return api
      .statsControllerGetUserOverview()
      .then((data) => data.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  adminStatsOverview() {
    return api
      .statsControllerGetStatsOverview()
      .then((data) => data.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  adminUserGrowth() {
    return api
      .statsControllerGetUserGrowth()
      .then((data) => data.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  adminRevenueGrowth() {
    return api
      .statsControllerGetRevenueGrowth()
      .then((data) => data.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default statsApi
