import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'

import { ESSAY_KEY_FACTORY } from '~/features/essay/services/essay-key-factory'
import essayApi from '~/features/essay/services/essayApi'
import { CreateEssayDto, EssaysResponse, UpdateEssayDto } from '~/services/api/api-axios'
import { PaginationParams } from '~/types/extend-api'

export const useListEssayByUser = (params: PaginationParams): UseQueryResult<EssaysResponse> => {
  return useQuery({
    queryKey: ESSAY_KEY_FACTORY.list(params),
    queryFn: () => essayApi.getAllEssayByUser(params),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}

export const useEssay = (id: string) => {
  return useQuery({
    queryKey: ESSAY_KEY_FACTORY.detail(id),
    queryFn: () => essayApi.getById(id),
    enabled: !!id,
    retry: false
  })
}

export const useCreateEssay = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEssayDto) => essayApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.lists() })
    }
  })
}

export const useUpdateEssay = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEssayDto }) => essayApi.update(id, data),
    onSuccess: (_updatedEssay, { id }) => {
      // Update both list and detail caches
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.lists() })
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.infinity })
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.detail(id) })
    }
  })
}

export const useDeleteEssayByUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => essayApi.deleteByUser(id),
    onSuccess: (_, id) => {
      // Update essays list cache
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.lists() })
      // Remove the deleted essay from cache
      queryClient.invalidateQueries({ queryKey: ESSAY_KEY_FACTORY.detail(id) })
    }
  })
}
