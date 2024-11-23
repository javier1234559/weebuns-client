import {
  CreateCourseDto,
  JoinCourseRequestDto,
  UpdateCourseDto,
  UpdateCourseProgressDto
} from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { PaginationParams } from '~/types/extend-api'
import { handleApiError } from '~/utils/handle-api-error'

export interface CourseExploreQueryParams {
  page?: number
  perPage?: number
  search?: string
  language?: string
  minLevel?: string
  maxLevel?: string
  topics?: string[]
  courseType?: string
}

const courseApi = {
  getAllJoined(
    id: string,
    query: {
      page: number
      perPage: number
    }
  ) {
    return api
      .spaceControllerGetSpaceCoursesJoined(id, query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getExplore(id: string, query: CourseExploreQueryParams) {
    return api
      .spaceControllerGetSpaceCourses(id, query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  join(id: string, data: JoinCourseRequestDto) {
    return api
      .courseControllerJoinCourse(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  learn(id: string) {
    return api
      .courseControllerLearnCourse(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  checkJoined(courseId: string, spaceId: string) {
    return api
      .courseControllerCheckJoin(courseId, spaceId)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data
      })
  },

  create(data: CreateCourseDto) {
    return api
      .courseControllerCreateCourse(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, data: UpdateCourseDto) {
    return api
      .courseControllerUpdate(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string) {
    return api
      .courseControllerDelete(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getAll(query: PaginationParams) {
    return api
      .courseControllerGetCourses(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getById(id: string) {
    return api
      .courseControllerGetCourseById(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getUnits(courseId: string, query: PaginationParams) {
    return api
      .courseControllerGetCourseUnits(courseId, query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  getProgress(courseId: string) {
    return api
      .courseControllerGetCourseProgress(courseId)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  updateCourseProgress(courseId: string, data: UpdateCourseProgressDto) {
    return api
      .courseControllerUpdateCourseProgress(courseId, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default courseApi
