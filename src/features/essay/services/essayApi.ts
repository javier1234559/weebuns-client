import { CreateEssayDto, UpdateEssayDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { PaginationParams } from '~/types/extend-api'
import { handleApiError } from '~/utils/handle-api-error'

const essayApi = {
  create(form: CreateEssayDto) {
    return api
      .essayControllerCreate(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAll(query?: PaginationParams) {
    return api
      .essayControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getById(id: string) {
    return api
      .essayControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, form: UpdateEssayDto) {
    return api
      .essayControllerUpdate(id, form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  deleteByUser(id: string) {
    return api
      .essayControllerDeleteByUser(id)
      .then(() => void 0)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string) {
    return api
      .essayControllerDelete(id)
      .then(() => void 0)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getBySpaceId(spaceId: string) {
    return api
      .essayControllerFindOne(spaceId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAllEssayByUser(query?: PaginationParams) {
    return api
      .essayControllerFindAllByUser(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }

  // updateStatus(id: string, status: string) {
  //   return api
  //     .essayControllerUpdateStatus(id, { status })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  // addHashtags(id: string, hashtagIds: string[]) {
  //   return api
  //     .essayControllerAddHashtags(id, { hashtagIds })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  // removeHashtags(id: string, hashtagIds: string[]) {
  //   return api
  //     .essayControllerRemoveHashtags(id, { hashtagIds })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // }
}

export default essayApi
