import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UNIT_KEY_FACTORY } from '~/features/unit/hooks/unit-key-factory'
import { CreateNoteDto, FindOneNoteResponseDto, Note, UpdateNoteDto } from '~/services/api/api-axios'

import noteApi, { NoteQueryParams } from '../services/noteApi'
import { NOTE_KEY_FACTORY } from './note-key-factory'

export const useNotes = (params: NoteQueryParams, options?: unknown) => {
  const { isBookmarked, ...rest } = params

  return useQuery({
    queryKey: isBookmarked ? NOTE_KEY_FACTORY.bookmarked(rest) : NOTE_KEY_FACTORY.list(rest),
    queryFn: () => noteApi.findAll(params),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useNote = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: NOTE_KEY_FACTORY.detail(id),
    queryFn: () => noteApi.findOne(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoteDto) => noteApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}

// export const useCreateOrUpdateNote = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: CreateNoteDto) => noteApi.createOrUpdate(data),
//     onSuccess: (response: FindOneNoteResponseDto) => {
//       queryClient.invalidateQueries({
//         queryKey: NOTE_KEY_FACTORY.lists(),
//         exact: false
//       })
//       queryClient.invalidateQueries({
//         queryKey: response.note ? NOTE_KEY_FACTORY.detail(response.note.id) : undefined,
//         exact: false
//       })
//     }
//   })
// }

export const useCreateOrUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoteDto) => noteApi.createOrUpdate(data),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEY_FACTORY.all })

      const previousLists = queryClient.getQueriesData({
        queryKey: NOTE_KEY_FACTORY.lists()
      })

      queryClient.setQueriesData({ queryKey: NOTE_KEY_FACTORY.lists() }, (old: any) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map((note: Note) => (note.unitId === data.unitId ? { ...note, ...data } : note))
        }
      })

      const previousUnit = queryClient.getQueryData(UNIT_KEY_FACTORY.note(data.unitId))

      return { previousLists, previousUnit }
    },
    onSettled: (_data: FindOneNoteResponseDto | undefined) => {
      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.lists(),
        exact: false
      })

      // Invalidate unit notes if note exists
      if (_data && _data.note?.unitId) {
        queryClient.invalidateQueries({
          queryKey: UNIT_KEY_FACTORY.note(_data.note.unitId)
        })
      }
    }
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNoteDto }) => noteApi.update(id, data),

    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: NOTE_KEY_FACTORY.all })

      // Get the current cache for all lists
      const previousLists = queryClient.getQueriesData({
        queryKey: NOTE_KEY_FACTORY.lists()
      })

      // Update lists
      queryClient.setQueriesData({ queryKey: NOTE_KEY_FACTORY.lists() }, (old: any) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map((note: Note) => (note.id === id ? { ...note, ...data } : note))
        }
      })

      // Update detail if exists
      const previousDetail = queryClient.getQueryData(NOTE_KEY_FACTORY.detail(id))
      if (previousDetail) {
        queryClient.setQueryData(NOTE_KEY_FACTORY.detail(id), (old: any) => ({
          ...old,
          ...data
        }))
      }

      return { previousLists, previousDetail }
    },

    onError: (_error, _variables, context) => {
      // Restore all lists on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(NOTE_KEY_FACTORY.detail(_variables.id), context.previousDetail)
      }
    },

    onSettled: (_data, _error, { id, data }) => {
      // If we have unitId in the data
      if (data.unitId) {
        queryClient.invalidateQueries({
          queryKey: UNIT_KEY_FACTORY.note(data.unitId)
        })
      }

      // If bookmark status changed, invalidate all bookmark queries
      if ('isBookmarked' in data) {
        queryClient.invalidateQueries({
          queryKey: NOTE_KEY_FACTORY.bookmark(),
          exact: false
        })
      }
    }
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => noteApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.lists(),
        exact: false
      })
    }
  })
}

export const useSpaceNotes = (spaceId: string, params: NoteQueryParams, options?: unknown) => {
  return useQuery({
    queryKey: [...NOTE_KEY_FACTORY.bySpace(spaceId), params],
    queryFn: () => noteApi.findAll({ ...params, spaceId }),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
