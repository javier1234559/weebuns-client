import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo, useMemo, useState } from 'react'

import ActionButton from '~/components/common/ActionButton'
import { AppInput } from '~/components/common/AppInput'
import { CorrectionSentenceFormData } from '~/features/essay/view/EssayDetailCreateCorrect'

interface CorrectionSentenceFormProps {
  index: number
  originalText: string
  onSaveItem: (data: CorrectionSentenceFormData, index: number) => void
  onDeleteItem: (index: number) => void

  defaultData?: CorrectionSentenceFormData
}

const CorrectionSentenceMode = {
  DEFAULT: 'DEFAULT',
  CORRECTED: 'CORRECTED',
  EDITING: 'EDITING',
  SAVED: 'SAVED'
} as const

type CorrectionSentenceMode = (typeof CorrectionSentenceMode)[keyof typeof CorrectionSentenceMode]
const CorrectionSentenceForm = ({
  defaultData,
  index,
  originalText,
  onSaveItem,
  onDeleteItem
}: CorrectionSentenceFormProps) => {
  const [formData, setFormData] = useState({
    corrected_text: defaultData?.corrected_text || '',
    explanation: defaultData?.explanation || ''
  })

  const decideMode = useMemo(() => {
    // console.log('defaultData', defaultData)
    if (!defaultData) return CorrectionSentenceMode.DEFAULT

    if (defaultData.is_correct) return CorrectionSentenceMode.CORRECTED
    if (!defaultData.is_correct && (defaultData.explanation || defaultData.corrected_text)) {
      return CorrectionSentenceMode.SAVED
    }
    return CorrectionSentenceMode.DEFAULT
  }, [defaultData])

  const [mode, setMode] = useState<CorrectionSentenceMode>(decideMode)

  const handleInputChange = (field: 'corrected_text' | 'explanation', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMarkAsCorrect = () => {
    //delete all corrections
    setFormData({
      corrected_text: '',
      explanation: ''
    })
    // insert this to a list of correction sentences
    onSaveItem(
      {
        original_text: originalText,
        corrected_text: '',
        explanation: '',
        is_correct: true,
        index: index,
        rating: 0
      },
      index
    )
    setMode(CorrectionSentenceMode.CORRECTED)
  }

  const handleSaveCorrection = () => {
    onSaveItem(
      {
        original_text: originalText,
        corrected_text: formData.corrected_text,
        explanation: formData.explanation,
        is_correct: false,
        index: index,
        rating: 0
      },
      index
    )
    setMode(CorrectionSentenceMode.SAVED)
  }

  const handleShowEditing = () => {
    if (!formData.corrected_text.trim()) {
      setFormData({
        corrected_text: originalText,
        explanation: ''
      })
    }
    setMode(CorrectionSentenceMode.EDITING)
  }

  const handleDelete = () => {
    onDeleteItem(index)
    setFormData({
      corrected_text: '',
      explanation: ''
    })
    setMode(CorrectionSentenceMode.DEFAULT)
  }

  const renderView = () => {
    switch (mode) {
      case CorrectionSentenceMode.DEFAULT:
        return (
          <Stack direction='row' spacing={2}>
            <ActionButton icon='check' title='Mark as Correct' variant='default' onClick={handleMarkAsCorrect} />
            <ActionButton icon='plus' title='Start Correction' variant='default' onClick={handleShowEditing} />
          </Stack>
        )
      case CorrectionSentenceMode.CORRECTED:
        return (
          <Stack direction='row' spacing={2}>
            <ActionButton onClick={handleDelete} icon='remove' title='Delete This Corrections' />
          </Stack>
        )
      case CorrectionSentenceMode.EDITING:
        return (
          <Collapse
            in={mode === CorrectionSentenceMode.EDITING}
            timeout={300}
            sx={{
              '& .MuiCollapse-wrapperInner': {
                mt: 1 // Add margin to the top of the content when expanded
              }
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant='subtitle2' gutterBottom>
                  Make your correction here
                </Typography>
                <AppInput
                  value={formData.corrected_text}
                  onChange={(e) => handleInputChange('corrected_text', e.target.value)}
                  placeholder='Corrected Text'
                  fullWidth
                  required
                />
              </Box>

              <Box>
                <Typography variant='subtitle2' gutterBottom>
                  Explanation of this correction (optional)
                </Typography>
                <AppInput
                  value={formData.explanation}
                  onChange={(e) => handleInputChange('explanation', e.target.value)}
                  placeholder='Explanation'
                  fullWidth
                  required
                />
              </Box>

              <Stack direction='row' spacing={2}>
                <ActionButton onClick={handleSaveCorrection} icon='check' title='Save This Corrections' />
                <ActionButton onClick={handleDelete} icon='remove' title='Delete This Corrections' />
              </Stack>
            </Stack>
          </Collapse>
        )
      case CorrectionSentenceMode.SAVED:
        return (
          <>
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Make your correction here
              </Typography>
              <AppInput
                value={formData.corrected_text}
                disabled={true}
                placeholder='Corrected Text'
                fullWidth
                required
              />
            </Box>
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Explanation of this correction (optional)
              </Typography>
              <AppInput value={formData.explanation} disabled={true} placeholder='Explanation' fullWidth required />
            </Box>
            <Stack direction='row' spacing={2}>
              <ActionButton onClick={handleShowEditing} icon='essay' title='Edit This Corrections' />
              <ActionButton onClick={handleDelete} icon='remove' title='Delete This Corrections' />
            </Stack>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Paper
          variant='outlined'
          sx={(theme) => ({
            p: 2,
            bgcolor:
              mode === CorrectionSentenceMode.CORRECTED ? theme.palette.success.light : theme.palette.background.paper,
            color:
              mode === CorrectionSentenceMode.CORRECTED
                ? theme.palette.success.contrastText
                : theme.palette.text.primary,
            borderRadius: 1
          })}
        >
          <Typography>{originalText}</Typography>
        </Paper>
      </Box>
      {renderView()}
    </Stack>
  )
}

CorrectionSentenceForm.displayName = 'CorrectionSentenceForm'
export default memo(CorrectionSentenceForm)
