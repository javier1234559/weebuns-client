import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateNoteDto, FindOneNoteResponseDto, UpdateNoteDto } from '~/services/api/api-axios'

import noteApi, { NoteQueryParams } from '../services/noteApi'
import { NOTE_KEY_FACTORY } from './note-key-factory'

export const useNotes = (params: NoteQueryParams, options?: unknown) => {
  return useQuery({
    queryKey: NOTE_KEY_FACTORY.list(params),
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

export const useCreateOrUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoteDto) => noteApi.createOrUpdate(data),
    onSuccess: (response: FindOneNoteResponseDto) => {
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.lists(),
        exact: false
      })
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.detail(response.note.id),
        exact: false
      })
    }
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNoteDto }) => noteApi.update(id, data),
    onSuccess: (_updatedNote, { id }) => {
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.lists(),
        exact: false
      })
      queryClient.invalidateQueries({
        queryKey: NOTE_KEY_FACTORY.detail(id)
      })
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

export const useBookmarkedNotes = (params: NoteQueryParams, options?: unknown) => {
  return useQuery({
    queryKey: [...NOTE_KEY_FACTORY.bookmarked(), params],
    queryFn: () => noteApi.findAll({ ...params, isBookmarked: true }),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
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
