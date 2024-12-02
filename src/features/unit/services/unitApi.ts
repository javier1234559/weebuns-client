import {
  BulkUpdateUnitsDto,
  CreateLessonDto,
  CreateUnitDto,
  UpdateLessonDto,
  UpdateUnitDto
} from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const unitApi = {
  // Unit operations
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

  learn(id: string) {
    return api
      .unitControllerLearnUnit(id)
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

  // Lesson operations

  getLesson(unitId: string, lessonId: string) {
    return api
      .unitControllerGetLesson(unitId, lessonId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  learnLesson(unitId: string, lessonId: string) {
    return api
      .unitControllerLearnLesson(unitId, lessonId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getLessonNote(unitId: string, lessonId: string) {
    return api
      .unitControllerGetLessonNote(unitId, lessonId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  createLesson(unitId: string, data: CreateLessonDto) {
    return api
      .unitControllerCreateLesson(unitId, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  updateLesson(unitId: string, lessonId: string, data: UpdateLessonDto) {
    return api
      .unitControllerUpdateLesson(unitId, lessonId, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  deleteLesson(unitId: string, lessonId: string) {
    return api
      .unitControllerDeleteLesson(unitId, lessonId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  bulkUpdateUnit(data: BulkUpdateUnitsDto) {
    return api
      .unitControllerBulkUpdateUnits(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default unitApi
