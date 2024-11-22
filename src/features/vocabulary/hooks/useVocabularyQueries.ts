import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { VOCABULARY_KEY_FACTORY } from '~/features/vocabulary/hooks/vocabulary-key-factory'
import vocabularyApi, { VocabularyQueryParams } from '~/features/vocabulary/services/vocabApi'
import { CreateVocabularyDto, UpdateVocabularyDto } from '~/services/api/api-axios'

export const useVocabularies = (params: VocabularyQueryParams, options?: unknown) => {
  return useQuery({
    queryKey: VOCABULARY_KEY_FACTORY.list(params),
    queryFn: () => vocabularyApi.findAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === 'object' ? options : {})
  })
}

export const useVocabulary = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: VOCABULARY_KEY_FACTORY.detail(id),
    queryFn: () => vocabularyApi.findOne(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCreateVocabulary = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateVocabularyDto) => vocabularyApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}

export const useUpdateVocabulary = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVocabularyDto }) => vocabularyApi.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: VOCABULARY_KEY_FACTORY.lists() })

      // Get the current cache data
      const previousLists = queryClient.getQueriesData({ queryKey: VOCABULARY_KEY_FACTORY.lists() })

      // Update all lists in cache that contain this vocabulary
      queryClient.setQueriesData({ queryKey: VOCABULARY_KEY_FACTORY.lists() }, (old: any) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map((vocab: any) => (vocab.id === id ? { ...vocab, ...data } : vocab))
        }
      })

      // Also update the detail cache if it exists
      const previousDetail = queryClient.getQueryData(VOCABULARY_KEY_FACTORY.detail(id))
      if (previousDetail) {
        queryClient.setQueryData(VOCABULARY_KEY_FACTORY.detail(id), (old: any) => ({ ...old, ...data }))
      }

      // Return context with previous values
      return { previousLists, previousDetail }
    },
    onError: (_error, _variables, context) => {
      // If the mutation fails, use the context we saved to roll back
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      // Also rollback detail if it existed
      if (context?.previousDetail) {
        queryClient.setQueryData(VOCABULARY_KEY_FACTORY.detail(_variables.id), context.previousDetail)
      }
    },
    onSettled: (_data, _error, { id }) => {
      // Always refetch after error or success to ensure we're in sync with server
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEY_FACTORY.detail(id)
      })
    }
  })
}

export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => vocabularyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}
