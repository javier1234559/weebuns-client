export const VOCABULARY_KEY_FACTORY = {
  all: ['vocabulary'] as const,
  lists: () => [...VOCABULARY_KEY_FACTORY.all, 'list'] as const,
  list: (params: any) => [...VOCABULARY_KEY_FACTORY.lists(), params] as const,
  details: () => [...VOCABULARY_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...VOCABULARY_KEY_FACTORY.details(), id] as const
}
