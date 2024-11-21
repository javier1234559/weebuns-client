import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import UnitContentTab from '~/features/unit/components/UnitContentTab'
import { useLearnUnit } from '~/features/unit/hooks/useUnitQueries'

interface UnitDetailLearnViewProps {
  unitId: string
}

const UnitDetailLearnView = ({ unitId }: UnitDetailLearnViewProps) => {
  const { data, isLoading, error } = useLearnUnit(unitId)

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError message={error?.message || 'No data found'} />

  return (
    <Box>
      {/* Unit Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {data.unit.title}
        </Typography>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          {data.unit.description}
        </Typography>
      </Box>

      {/* Content Tabs */}
      <Box sx={{ mb: 4 }}>
        <UnitContentTab contents={data.unit.contents || []} />
      </Box>

      {/* Notes Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          Notes
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Your notes will appear here...
        </Typography>
      </Paper>

      {/* Comments Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Comments
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Comments will appear here...
        </Typography>
      </Paper>
    </Box>
  )
}

UnitDetailLearnView.displayName = 'UnitDetailLearnView'
export default memo(UnitDetailLearnView)
