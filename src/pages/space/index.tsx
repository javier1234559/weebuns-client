import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import SpaceListView from '~/features/space/views/SpaceListView'

function LearningSpace() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h3' gutterBottom>
        Learning Spaces
      </Typography>
      <SpaceListView />
    </Box>
  )
}

LearningSpace.displayName = 'LearningSpace'
export default LearningSpace
