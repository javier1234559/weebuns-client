import Grid from '@mui/material/Grid'

import { MOCK_FEEDS } from '~/features/community/mocks/feed'

import EssayCard from './FeedCard'

function FeedView() {
  return (
    <Grid item xs={12} md={8}>
      {MOCK_FEEDS.map((item) => (
        <EssayCard key={item.id} item={item} />
      ))}
    </Grid>
  )
}

export default FeedView
