import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo, useState } from 'react'

import { AppButton } from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import { CorrectionSentenceFormData } from '~/features/essay/view/EssayDetailCorrect'

interface CorrectionSentenceFormProps {
  index: number
  originalText: string
  onSubmitItem: (data: CorrectionSentenceFormData, index: number) => void
  onDeleteItem: (index: number) => void
}

const CorrectionSentenceForm = ({ index, originalText, onSubmitItem, onDeleteItem }: CorrectionSentenceFormProps) => {
  const [formData, setFormData] = useState({
    corrected_text: '',
    explanation: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: 'corrected_text' | 'explanation', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitCorrection = () => {
    onSubmitItem(
      {
        original_text: originalText,
        corrected_text: formData.corrected_text,
        explanation: formData.explanation,
        is_correct: false,
        index: 0,
        rating: 0
      },
      index
    )
    setIsSubmitted(true)
  }

  const handleMarkAsCorrect = () => {
    setFormData({
      corrected_text: '',
      explanation: ''
    })
    onSubmitItem(
      {
        original_text: originalText,
        corrected_text: '',
        explanation: '',
        is_correct: true,
        index: 0,
        rating: 0
      },
      index
    )
    setIsSubmitted(true)
  }

  const handleToggleEdit = () => {
    setIsSubmitted((prev) => !prev)
  }

  const handleDelete = () => {
    setIsSubmitted(false)
    onDeleteItem(index)
    setFormData({
      corrected_text: '',
      explanation: ''
    })
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant='subtitle1' fontWeight='medium' gutterBottom>
          Original Text:
        </Typography>
        <Paper variant='outlined' sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography>{originalText}</Typography>
        </Paper>
      </Box>

      <Stack spacing={2}>
        <Box>
          <Typography variant='subtitle2' gutterBottom>
            Make your correction here
          </Typography>
          <AppInput
            value={formData.corrected_text}
            disabled={isSubmitted}
            onChange={(e) => handleInputChange('corrected_text', e.target.value)}
            placeholder='Corrected Text'
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant='subtitle2' gutterBottom>
            Explanation of this correction (optional)
          </Typography>
          <AppInput
            value={formData.explanation}
            disabled={isSubmitted}
            onChange={(e) => handleInputChange('explanation', e.target.value)}
            placeholder='Explanation'
            fullWidth
          />
        </Box>

        <Stack direction='row' spacing={2}>
          {!isSubmitted ? (
            <>
              <AppButton onClick={handleSubmitCorrection} variant='outlined'>
                Save Correction
              </AppButton>
              <AppButton
                onClick={handleMarkAsCorrect}
                variant='outlined'
                sx={{
                  bgcolor: 'success.lighter',
                  '&:hover': { bgcolor: 'success.light' }
                }}
              >
                Mark as Correct
              </AppButton>
            </>
          ) : (
            <>
              <AppButton
                onClick={handleToggleEdit}
                variant='outlined'
                sx={{
                  bgcolor: 'success.lighter',
                  '&:hover': { bgcolor: 'success.light' }
                }}
              >
                Toggle
              </AppButton>
              <AppButton onClick={handleDelete} variant='outlined'>
                Delete
              </AppButton>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

CorrectionSentenceForm.displayName = 'CorrectionSentenceForm'
export default memo(CorrectionSentenceForm)
