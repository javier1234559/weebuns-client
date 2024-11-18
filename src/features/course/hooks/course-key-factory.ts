import { PaginationParams } from '~/types/extend-api'

export const COURSE_KEY_FACTORY = {
  all: ['course'] as const,
  lists: () => [...COURSE_KEY_FACTORY.all, 'list'] as const,
  joined: () => [...COURSE_KEY_FACTORY.all, 'joined'] as const,
  recommend: () => [...COURSE_KEY_FACTORY.all, 'recommend'] as const,
  list: (filters: PaginationParams) => [...COURSE_KEY_FACTORY.lists(), filters] as const,
  details: () => [...COURSE_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...COURSE_KEY_FACTORY.details(), id] as const
}
