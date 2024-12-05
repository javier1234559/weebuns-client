import { useCheckSubscription } from '~/features/subscription/hooks/useCheckSubscription'

export type SubscriptionType = 'FREE' | 'BASIC' | 'PREMIUM'

interface SubscriptionStatus {
  isActive: boolean
  type: SubscriptionType
  isLoading: boolean
}

export const useSubscriptionStatus = (): SubscriptionStatus => {
  const { data, isLoading } = useCheckSubscription()

  console.log(data)

  return {
    isActive: data?.isActive || false,
    type: data?.type || 'FREE',
    isLoading
  }
}
