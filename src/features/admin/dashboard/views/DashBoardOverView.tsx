import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import GrowthChart, { monthlyRevenueData, monthlyUserData } from '~/features/admin/dashboard/components/GrowthChart'
import DashBoardStatsView from '~/features/admin/dashboard/views/DashBoardStatsView'

function DashBoardOverView() {
  return (
    <>
      <Box py={4}>
        <DashBoardStatsView />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GrowthChart data={monthlyUserData} dataKey='users' title='New User Growth' type='users' />
        </Grid>
        <Grid item xs={12} md={6}>
          <GrowthChart data={monthlyRevenueData} dataKey='revenue' title='Monthly Revenue' type='revenue' />
        </Grid>
      </Grid>
    </>
  )
}

DashBoardOverView.displayName = 'DashBoardOverView'
export default DashBoardOverView
