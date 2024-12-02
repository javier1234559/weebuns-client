import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ESSAY_KEY_FACTORY } from '~/features/essay/services/essay-key-factory'
import essayApi from '~/features/essay/services/essayApi'
import useElementOnScreen from '~/hooks/useElementOnScreen'
import { StatusParams } from '~/types/enum'

export const ITEMS_PER_PAGE_FEED = 3

const useInfiniteFeed = () => {
  const { elementRef, inView } = useElementOnScreen()

  const { isPending, data, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
    queryKey: ESSAY_KEY_FACTORY.infinity,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await essayApi.getAll({
        page: pageParam,
        perPage: ITEMS_PER_PAGE_FEED,
        status: StatusParams.published
      })
      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    gcTime: 1000 * 60 * 30 // cache data for 30 minutes
  })

  // Fetch next page when the last item is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return {
    data,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isPending,
    error,
    loadingTriggerRef: elementRef
  }
}

export default useInfiniteFeed
