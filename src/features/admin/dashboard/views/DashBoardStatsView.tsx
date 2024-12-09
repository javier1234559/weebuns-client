import Grid from '@mui/material/Grid'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import StatsCard from '~/features/admin/dashboard/components/StatsCard'
import { useAdminStatsOverview } from '~/features/space/hooks/useStatsQueries'

function DashBoardStatsView() {
  const { data: overviewData, isLoading, error } = useAdminStatsOverview()
  const stats = overviewData?.data

  if (isLoading) return <AppLoading />
  if (error || !stats) return <AppError error={error} />

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

DashBoardStatsView.displayName = 'DashBoardStatsView'
export default DashBoardStatsView
