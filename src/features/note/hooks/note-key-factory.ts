export const NOTE_KEY_FACTORY = {
  all: ['note'] as const,
  lists: () => [...NOTE_KEY_FACTORY.all, 'list'] as const,
  list: (params: any) => [...NOTE_KEY_FACTORY.lists(), params] as const,
  details: () => [...NOTE_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...NOTE_KEY_FACTORY.details(), id] as const,
  bookmarked: () => [...NOTE_KEY_FACTORY.lists(), 'bookmarked'] as const,
  bySpace: (spaceId: string) => [...NOTE_KEY_FACTORY.lists(), 'space', spaceId] as const
}
