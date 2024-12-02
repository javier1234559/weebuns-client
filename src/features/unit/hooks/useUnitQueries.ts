import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { COURSE_KEY_FACTORY } from '~/features/course/hooks/course-key-factory'
import { UNIT_KEY_FACTORY } from '~/features/unit/hooks/unit-key-factory'
import {
  BulkUpdateUnitsDto,
  CreateLessonDto,
  CreateUnitDto,
  UpdateLessonDto,
  UpdateUnitDto
} from '~/services/api/api-axios'

import unitApi from '../services/unitApi'

export const useGetUnitById = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.detail(id),
    queryFn: () => unitApi.getById(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useLearnUnit = (unitId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.learn(unitId),
    queryFn: () => unitApi.learn(unitId),
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

// Unit Mutation Hooks
export const useCreateUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUnitDto) => unitApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lists() })
    }
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUnitDto }) => unitApi.update(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.detail(id) })
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lists() })
    }
  })
}

export const useDeleteUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unitApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lists() })
    }
  })
}

// Lesson Query Hooks
export const useGetLesson = (unitId: string, lessonId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.lesson(lessonId),
    queryFn: () => unitApi.getLesson(unitId, lessonId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useGetLessonNote = (unitId: string, lessonId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.lessonNote(lessonId),
    queryFn: () => unitApi.getLessonNote(unitId, lessonId),
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...(typeof options === 'object' ? options : {})
  })
}

// Lesson Mutation Hooks
export const useCreateLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, data }: { unitId: string; data: CreateLessonDto }) => unitApi.createLesson(unitId, data),
    onSuccess: (_data, { unitId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lessons(unitId) })
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.detail(unitId) })
    }
  })
}

export const useUpdateLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, lessonId, data }: { unitId: string; lessonId: string; data: UpdateLessonDto }) =>
      unitApi.updateLesson(unitId, lessonId, data),
    onSuccess: (_data, { unitId, lessonId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lesson(lessonId) })
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lessons(unitId) })
    }
  })
}

export const useDeleteLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, lessonId }: { unitId: string; lessonId: string }) => unitApi.deleteLesson(unitId, lessonId),
    onSuccess: (_data, { unitId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.lessons(unitId) })
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.detail(unitId) })
    }
  })
}

export const useLearnLesson = (unitId: string, lessonId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.learnLesson(lessonId),
    queryFn: () => unitApi.learnLesson(unitId, lessonId),
    retry: false, // Disable retries like in useLearnUnit
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    ...(typeof options === 'object' ? options : {})
  })
}

export const useBulkUpdateLesson = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { data: BulkUpdateUnitsDto }) => unitApi.bulkUpdateUnit(data.data),
    onSuccess: (_data, variables) => {
      // Only invalidate after successful update
      queryClient.invalidateQueries({
        queryKey: COURSE_KEY_FACTORY.units(variables.data.courseId)
      })
    }
  })
}
