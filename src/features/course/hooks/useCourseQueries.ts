import { useQuery } from '@tanstack/react-query'

import { COURSE_KEY_FACTORY } from '~/features/course/hooks/course-key-factory'
import courseApi from '~/features/course/services/courseApi'
import { PaginationParams } from '~/types/extend-api'

export const useCourseJoined = (id: string, params: PaginationParams, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.joined(),
    queryFn: () => courseApi.getAllCourseJoined(id, { page: params.page || 1, perPage: params.perPage || 10 }),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useRecommendedCourses = () => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.recommend(),
    // queryFn: () => courseApi.getRecommendedCourses(),
    staleTime: 1000 * 60 * 5,
    initialData: []
  })
}

export const useCourses = (params: PaginationParams, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.all,
    queryFn: () => courseApi,
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
