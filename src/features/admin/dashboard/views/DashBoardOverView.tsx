import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import GrowthChart from '~/features/admin/dashboard/components/GrowthChart'
import { formatGrowthData } from '~/features/admin/dashboard/utils/chart-data-formatter'
import DashBoardStatsView from '~/features/admin/dashboard/views/DashBoardStatsView'
import { useAdminRevenueGrowth, useAdminUserGrowth } from '~/features/space/hooks/useStatsQueries'

function DashBoardOverView() {
  const { data: userGrowthData } = useAdminUserGrowth()
  const { data: revenueGrowthData } = useAdminRevenueGrowth()

  const formattedUserData = userGrowthData ? formatGrowthData(userGrowthData.data, 'users') : []
  const formattedRevenueData = revenueGrowthData ? formatGrowthData(revenueGrowthData.data, 'revenue') : []

  console.log(formattedUserData)
  console.log(formattedRevenueData)

  return (
    <>
      <Box py={4}>
        <DashBoardStatsView />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GrowthChart data={formattedUserData} dataKey='users' title='New User Growth' type='users' />
        </Grid>
        <Grid item xs={12} md={6}>
          <GrowthChart data={formattedRevenueData} dataKey='revenue' title='Monthly Revenue' type='revenue' />
        </Grid>
      </Grid>
    </>
  )
}

DashBoardOverView.displayName = 'DashBoardOverView'
export default DashBoardOverView
