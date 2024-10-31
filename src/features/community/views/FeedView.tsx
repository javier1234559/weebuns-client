import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { ModalProvider as ModalContext } from '~/contexts/ModalContext'
import FeedError from '~/features/community/components/Feed/FeedError'
import FeedSkeleton from '~/features/community/components/Feed/FeedSkeleton'
import useInfiniteFeed from '~/features/community/hooks/useInfiniteFeed'

import EssayCard from '../components/Feed/FeedCard'

function NextPageSkeleton() {
  return <FeedSkeleton />
}

function FeedView() {
  const { data, isPending, isError, error, isFetchingNextPage, loadingTriggerRef } = useInfiniteFeed()

  if (isPending)
    return (
      <Grid item xs={12} md={8}>
        <FeedSkeleton />
      </Grid>
    )

  if (isError) {
    return <FeedError message={error?.message || 'Something went wrong'} />
  }

  return (
    <ModalContext>
      <Grid item xs={12} md={8}>
        {data?.pages.map((essayData, pageIndex) => (
          <div key={pageIndex}>
            {essayData.map((item) => (
              <EssayCard key={item.id} item={item} />
            ))}
          </div>
        ))}

        <Box ref={loadingTriggerRef}>{isFetchingNextPage && <NextPageSkeleton />}</Box>
      </Grid>
    </ModalContext>
  )
}

export default FeedView
