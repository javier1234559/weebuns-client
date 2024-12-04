import { useQuery } from '@tanstack/react-query'

import subscriptionApi from '../services/subscriptionApi'

export const useCheckSubscription = () => {
  return useQuery({
    queryKey: ['subscription-status'],
    queryFn: () => subscriptionApi.getStatus(),
    // Refresh when window gains focus
    refetchOnWindowFocus: true,
    // Refresh when tab becomes active
    refetchOnMount: true,
    // Refresh when reconnecting
    refetchOnReconnect: true,
    // Refresh every 1 minute (60000ms)
    refetchInterval: 60000,
    // Continue refreshing even when window/tab is in background
    refetchIntervalInBackground: true,
    // Cache data for 2 minutes
    staleTime: 2 * 60 * 1000,
    // Retry 3 times if request fails
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

export default useCheckSubscription
