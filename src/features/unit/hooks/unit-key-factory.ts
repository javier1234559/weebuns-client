export const UNIT_KEY_FACTORY = {
  all: ['unit'] as const,
  lists: () => [...UNIT_KEY_FACTORY.all, 'list'] as const,
  details: () => [...UNIT_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...UNIT_KEY_FACTORY.details(), id] as const,
  contents: (unitId: string) => [...UNIT_KEY_FACTORY.all, 'contents', unitId] as const,
  content: (unitId: string, contentId: string) => [...UNIT_KEY_FACTORY.contents(unitId), contentId] as const,
  learn: (unitId: string) => [...UNIT_KEY_FACTORY.all, 'learn', unitId] as const,
  note: (id: string) => [...UNIT_KEY_FACTORY.details(), id, 'note'] as const
}
