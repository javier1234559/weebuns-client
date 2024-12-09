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

export const useAdminStatsOverview = (options?: unknown) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.adminOverview(),
    queryFn: () => statsApi.adminStatsOverview(),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useAdminUserGrowth = (options?: unknown) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.adminUserGrowth(),
    queryFn: () => statsApi.adminUserGrowth(),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useAdminRevenueGrowth = (options?: unknown) => {
  return useQuery({
    queryKey: STATS_KEY_FACTORY.adminRevenueGrowth(),
    queryFn: () => statsApi.adminRevenueGrowth(),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
