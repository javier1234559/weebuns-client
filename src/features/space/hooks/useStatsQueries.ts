import { useQuery } from '@tanstack/react-query'

import { STATS_KEY_FACTORY } from '~/features/space/services/stats-key-factory'
import statsApi from '~/features/space/services/statsApi'

export const useStatsActivityStreak = (options?: unknown) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.activity(),
    queryFn: () => statsApi.statsActivityStreak(),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useStatsOverview = (options?: unknown) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.overview(),
    queryFn: () => statsApi.statsOverview(),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
