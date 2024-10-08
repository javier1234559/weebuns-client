import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import LearningSpaceCard from '~/components/views/learning-space/LearningSpaceCard'
import { MOCK_LEARNING_SPACE } from '~/data/space'

// Mock data array

function LearningSpace() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h3' gutterBottom>
        Learning Spaces
      </Typography>
      <Grid container spacing={2}>
        {MOCK_LEARNING_SPACE.map((learningSpace) => (
          <Grid item key={learningSpace.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
              <LearningSpaceCard
                id={learningSpace.id}
                name={learningSpace.name}
                thumbnail={learningSpace.thumbnail}
                summary={learningSpace.summary}
                followerNumber={learningSpace.memberNumber}
                essay={learningSpace.essay}
                quiz={learningSpace.quiz}
                vocabulary={learningSpace.vocabulary}
                createAt={learningSpace.createdAt}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

LearningSpace.displayName = 'LearningSpace'
export default LearningSpace
