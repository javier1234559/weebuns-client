import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Lightbulb } from 'lucide-react'

import { CorrectionSentence as CorrectionSentenceType } from '~/services/graphql/graphql'
interface CorrectionSentenceProps {
  item: CorrectionSentenceType
  isShowExplain?: boolean
}

const CorrectionSentence = ({ item, isShowExplain }: CorrectionSentenceProps) => {
  const isCorrect = item.isCorrect

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: (theme) =>
          isCorrect
            ? theme.palette.mode === 'dark'
              ? theme.palette.success.dark
              : theme.palette.success.light
            : theme.palette.background.default,
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mb: 1
        }}
      >
        <Typography variant='subtitle2' color='text.secondary'>
          {item.originalText}
        </Typography>
        {!isCorrect && <Typography>{item.correctedText}</Typography>}
      </Box>

      {!isCorrect && (
        <Collapse
          in={isShowExplain}
          timeout={300}
          sx={{
            '& .MuiCollapse-wrapperInner': {
              mt: 1 // Add margin to the top of the content when expanded
            }
          }}
        >
          <Box>
            <Divider />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              <Box
                component='span'
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.primary',
                  flexShrink: 0
                }}
              >
                <Lightbulb size={12} />
                <span>Explain:</span>
              </Box>
              {item.explanation}
            </Typography>
          </Box>
        </Collapse>
      )}
    </Paper>
  )
}

CorrectionSentence.displayName = 'CorrectionSentence'
export default CorrectionSentence
