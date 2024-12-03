import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ComparisonResult } from '~/utils/text-utils'

interface ComparisonResultViewProps {
  result: ComparisonResult
}

const getDiffStyles = (type: 'correct' | 'added' | 'removed') => {
  switch (type) {
    case 'added':
      return {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        color: 'error.main',
        textDecoration: 'underline'
      }
    case 'removed':
      return {
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        color: 'success.main',
        textDecoration: 'line-through'
      }
    default:
      return {
        color: 'text.primary'
      }
  }
}

export default function ComparisonResultView({ result }: ComparisonResultViewProps) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h6' gutterBottom>
        Comparison Result (Accuracy: {result.accuracy.toFixed(1)}%)
      </Typography>

      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {result.differences.map((diff, index) => (
          <Typography
            key={index}
            component='span'
            sx={{
              ...getDiffStyles(diff.type),
              whiteSpace: 'pre-wrap'
            }}
          >
            {diff.text}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography color='text.secondary'>Total Errors: {result.totalErrors}</Typography>

        {result.accuracy < 100 && (
          <Alert severity='info' sx={{ mt: 1 }}>
            Try to:
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Check your spelling</li>
              <li>Make sure you included all punctuation marks</li>
              <li>Listen to the audio again for missed words</li>
            </ul>
          </Alert>
        )}
      </Box>
    </Box>
  )
}
