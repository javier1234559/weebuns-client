import { PaginationParams } from '~/types/extend-api'

export const ESSAY_KEY_FACTORY = {
  all: ['essays'] as const,
  infinity: ['essays-infinity'] as const,
  lists: () => [...ESSAY_KEY_FACTORY.all, 'list'] as const,
  list: (filters: PaginationParams) => [...ESSAY_KEY_FACTORY.lists(), filters] as const,
  details: () => [...ESSAY_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...ESSAY_KEY_FACTORY.details(), id] as const
}
