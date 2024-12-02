export const LESSON_KEY_FACTORY = {
  all: ['lessons'] as const,
  lists: () => [...LESSON_KEY_FACTORY.all, 'list'] as const,
  details: () => [...LESSON_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...LESSON_KEY_FACTORY.details(), id] as const
}
