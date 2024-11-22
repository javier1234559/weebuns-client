import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UNIT_KEY_FACTORY } from '~/features/unit/hooks/unit-key-factory'
import { CreateUnitContentDto, CreateUnitDto, UpdateUnitContentDto, UpdateUnitDto } from '~/services/api/api-axios'

import unitApi from '../services/unitApi'

export const useGetUnitById = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.detail(id),
    queryFn: () => unitApi.getById(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

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

export const useGetUnitContents = (unitId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.contents(unitId),
    queryFn: () => unitApi.getUnitContents(unitId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useGetUnitContent = (unitId: string, contentId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.content(unitId, contentId),
    queryFn: () => unitApi.getUnitContent(unitId, contentId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCreateUnitContent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, data }: { unitId: string; data: CreateUnitContentDto }) =>
      unitApi.createUnitContent(unitId, data),
    onSuccess: (_data, { unitId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.contents(unitId) })
    }
  })
}

export const useUpdateUnitContent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, contentId, data }: { unitId: string; contentId: string; data: UpdateUnitContentDto }) =>
      unitApi.updateUnitContent(unitId, contentId, data),
    onSuccess: (_data, { unitId, contentId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.content(unitId, contentId) })
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.contents(unitId) })
    }
  })
}

export const useDeleteUnitContent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ unitId, contentId }: { unitId: string; contentId: string }) =>
      unitApi.deleteUnitContent(unitId, contentId),
    onSuccess: (_data, { unitId }) => {
      queryClient.invalidateQueries({ queryKey: UNIT_KEY_FACTORY.contents(unitId) })
    }
  })
}

export const useLearnUnit = (unitId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.learn(unitId),
    queryFn: () => unitApi.learn(unitId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useGetUnitNote = (unitId: string, options?: unknown) => {
  return useQuery({
    queryKey: UNIT_KEY_FACTORY.note(unitId),
    queryFn: () => unitApi.getUnitNote(unitId),
    staleTime: 1000 * 60 * 5,
    retry: false, // Disable retries
    refetchOnWindowFocus: false, // Turn off refetch on window focus
    refetchOnReconnect: false, // Turn off refetch on reconnect
    refetchOnMount: false, // Turn off refetch on mount
    ...(typeof options === 'object' ? options : {})
  })
}
