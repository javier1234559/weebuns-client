import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { COURSE_KEY_FACTORY } from '~/features/course/hooks/course-key-factory'
import courseApi, { CourseExploreQueryParams } from '~/features/course/services/courseApi'
import {
  CreateCourseDto,
  JoinCourseRequestDto,
  UpdateCourseDto,
  UpdateCourseProgressDto
} from '~/services/api/api-axios'
import { PaginationParams } from '~/types/extend-api'

export const useCourseJoined = (id: string, params: PaginationParams, options?: unknown) => {
  return useQuery({
    queryKey: [...COURSE_KEY_FACTORY.joined(), { id, ...params }],
    queryFn: () => courseApi.getAllJoined(id, { page: params.page || 1, perPage: params.perPage || 10 }),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCourses = (params: PaginationParams, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.list(params),
    queryFn: () => courseApi.getAll(params),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCoursesExplore = (spaceId: string, params: CourseExploreQueryParams, options?: unknown) => {
  return useQuery({
    queryKey: [...COURSE_KEY_FACTORY.explore(), { spaceId, ...params }],
    queryFn: () => courseApi.getExplore(spaceId, params),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseDto }) => courseApi.update(id, data),
    onSuccess: (_updatedCourse, { id }) => {
      // Invalidate all list-related queries and the specific detail
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.lists(),
        exact: false
      })
      queryClient.invalidateQueries({ queryKey: COURSE_KEY_FACTORY.detail(id) })
    }
  })
}

export const useGetCourseById = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.detail(id),
    queryFn: () => courseApi.getById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCourseDto) => courseApi.create(data),
    onSuccess: () => {
      // Invalidate all list-related queries
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => courseApi.delete(id),
    onSuccess: () => {
      // Invalidate all list-related queries
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}

export const useGetCourseUnits = (courseId: string, params: PaginationParams, options?: unknown) => {
  return useQuery({
    queryKey: [...COURSE_KEY_FACTORY.units(courseId), params],
    queryFn: () => courseApi.getUnits(courseId, params),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useJoinCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: JoinCourseRequestDto }) => courseApi.join(id, data),
    onSuccess: () => {
      // Invalidate both joined and explore queries with all params
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.joined(),
        exact: false
      })
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.explore(),
        exact: false
      })

      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.join(),
        exact: false
      })
    }
  })
}

export const useGetCourseProgress = (courseId: string, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.progress(courseId),
    queryFn: () => courseApi.getProgress(courseId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useUpdateCourseProgress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: UpdateCourseProgressDto }) =>
      courseApi.updateCourseProgress(courseId, data),
    onSuccess: (_data, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEY_FACTORY.progress(courseId) })
      queryClient.invalidateQueries({ queryKey: COURSE_KEY_FACTORY.detail(courseId) })
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.joined(),
        exact: false
      })
    }
  })
}

export const useCourseLearn = (courseId: string, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.learn(courseId),
    queryFn: () => courseApi.learn(courseId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCheckCourseJoined = (courseId: string, spaceId: string, options?: unknown) => {
  return useQuery({
    queryKey: COURSE_KEY_FACTORY.checkJoin(courseId),
    queryFn: () => courseApi.checkJoined(courseId, spaceId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
