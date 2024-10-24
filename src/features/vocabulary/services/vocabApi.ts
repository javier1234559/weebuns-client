import { CreateVocabularyDto, UpdateVocabularyDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const vocabularyApi = {
  create(form: CreateVocabularyDto) {
    return api
      .vocabularyControllerCreate(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAll(query?: { page?: number; perPage?: number; search?: string; spaceId?: string }) {
    return api
      .vocabularyControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getById(id: string) {
    return api
      .vocabularyControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, form: UpdateVocabularyDto) {
    return api
      .vocabularyControllerUpdate(id, form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string) {
    return api
      .vocabularyControllerDelete(id)
      .then(() => void 0)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }

  // getBySpaceId(
  //   spaceId: string,
  //   query?: {
  //     page?: number
  //     perPage?: number
  //     search?: string
  //   }
  // ) {
  //   return api
  //     .vocabularyControllerGetBySpaceId(spaceId, query)
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // }

  // Additional methods that might be useful (commented out for now)

  // // Get vocabularies by user ID
  // getByUserId(
  //   userId: string,
  //   params?: {
  //     status?: string
  //     search?: string
  //     page?: number
  //     perPage?: number
  //   }
  // ) {
  //   return api
  //     .vocabularyControllerFindByUserId(userId, params)
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  // // Update vocabulary status
  // updateStatus(id: string, status: string) {
  //   return api
  //     .vocabularyControllerUpdateStatus(id, { status })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  // // Add tags to vocabulary
  // addTags(id: string, tagIds: string[]) {
  //   return api
  //     .vocabularyControllerAddTags(id, { tagIds })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  // // Remove tags from vocabulary
  // removeTags(id: string, tagIds: string[]) {
  //   return api
  //     .vocabularyControllerRemoveTags(id, { tagIds })
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // }
}

export default vocabularyApi
