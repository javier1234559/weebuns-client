import { PaginationParams } from '~/types/extend-api'

export const SPACE_KEY_FACTORY = {
  all: ['space'] as const,
  lists: () => [...SPACE_KEY_FACTORY.all, 'list'] as const,
  list: (filters: PaginationParams) => [...SPACE_KEY_FACTORY.lists(), filters] as const,
  details: () => [...SPACE_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...SPACE_KEY_FACTORY.details(), id] as const
}
