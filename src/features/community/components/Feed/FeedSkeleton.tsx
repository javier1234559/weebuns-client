import Box from '@mui/material/Box'

import { ITEMS_PER_PAGE_FEED } from '~/features/community/hooks/useInfiniteFeed'

import EssayCardSkeleton from './EssayCardSkeleton'

function FeedSkeleton() {
  return (
    <>
      {Array.from({ length: ITEMS_PER_PAGE_FEED }).map((_, index) => (
        <Box key={`skeleton-${index}`}>
          <EssayCardSkeleton />
        </Box>
      ))}
    </>
  )
}

export default FeedSkeleton
