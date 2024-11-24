import Grid from '@mui/material/Grid'

import StatsCard from '~/features/admin/dashboard/components/StatsCard'
import { MOCK_STATS_DATA } from '~/features/admin/dashboard/mocks/MOCK_STATS_DATA'

function DashBoardStatsView() {
  const stats = MOCK_STATS_DATA

  return (
    <Grid container spacing={3}>
      {stats.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <StatsCard data={item} />
        </Grid>
      ))}
    </Grid>
  )
}

DashBoardStatsView.propTypes = {}

export default DashBoardStatsView
