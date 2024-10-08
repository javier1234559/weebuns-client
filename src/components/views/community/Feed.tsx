import Grid from '@mui/material/Grid'

import { MOCK_FEEDS } from '~/data/feed'

import EssayCard from './FeedCard'

function Feed() {
  return (
    <Grid item xs={12} md={8}>
      {MOCK_FEEDS.map((item) => (
        <EssayCard key={item.id} item={item} />
      ))}
    </Grid>
  )
}

export default Feed
