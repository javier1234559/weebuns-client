import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import StatsSpaceOverview from '~/features/space/components/StatsSpaceOverview'
import StreakLearningCalendar from '~/features/space/components/StreakLearningCalendar'
import SpaceListView from '~/features/space/views/SpaceListView'

function SpaceDashBoard() {
  return (
    <Box>
      <StatsSpaceOverview />

      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom sx={{ mb: 3 }}>
          Learning Streak
        </Typography>
        <StreakLearningCalendar />
      </Box>

      <Box>
        <Typography variant='h5' gutterBottom sx={{ mb: 3 }}>
          My Spaces
        </Typography>
        <SpaceListView />
      </Box>
    </Box>
  )
}

export default SpaceDashBoard
