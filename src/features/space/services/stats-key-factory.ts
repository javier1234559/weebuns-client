export const STATS_KEY_FACTORY = {
  all: ['Stats'] as const,
  overview: () => [...STATS_KEY_FACTORY.all, 'overview'] as const,
  activity: () => [...STATS_KEY_FACTORY.all, 'activity'] as const
}
