import { CreateSpaceDto, UpdateSpaceDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { PaginationParams } from '~/types/extend-api'
import { handleApiError } from '~/utils/handle-api-error'

const spaceApi = {
  create(form: CreateSpaceDto) {
    return api
      .spaceControllerCreate(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAll(query?: PaginationParams) {
    return api
      .spaceControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getById(id: string) {
    return api
      .spaceControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, form: UpdateSpaceDto) {
    return api
      .spaceControllerUpdate(id, form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string) {
    return api
      .spaceControllerDelete(id)
      .then(() => void 0)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default spaceApi
