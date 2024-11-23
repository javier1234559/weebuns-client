import { CreateUnitContentDto, CreateUnitDto, UpdateUnitContentDto, UpdateUnitDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const unitApi = {
  create(data: CreateUnitDto) {
    return api
      .unitControllerCreateUnit(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getById(id: string) {
    return api
      .unitControllerGetUnit(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, data: UpdateUnitDto) {
    return api
      .unitControllerUpdateUnit(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string) {
    return api
      .unitControllerDeleteUnit(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  learn(id: string) {
    return api
      .unitControllerLearnUnit(id)
      .then((res) => res.data)
      .catch((err) => {
        // handleApiError(err)
        throw err.response.data
      })
  },

  getUnitNote(id: string) {
    return api
      .unitControllerGetUnitNote(id)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data
      })
  },

  getUnitContents(id: string) {
    return api
      .unitControllerGetUnitContents(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getUnitContent(id: string, contentId: string) {
    return api
      .unitControllerGetUnitContent(id, contentId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  createUnitContent(id: string, data: CreateUnitContentDto) {
    return api
      .unitControllerCreateUnitContent(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  updateUnitContent(id: string, contentId: string, data: UpdateUnitContentDto) {
    return api
      .unitControllerUpdateUnitContent(id, contentId, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  deleteUnitContent(id: string, contentId: string) {
    return api
      .unitControllerDeleteUnitContent(id, contentId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default unitApi
