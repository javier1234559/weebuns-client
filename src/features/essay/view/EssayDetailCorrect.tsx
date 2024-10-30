import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useMemo, useState } from 'react'

import AppButton from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import CorrectionSentenceForm from '~/features/essay/components/CorrectionSentenceForm'
import { CONTENT_MOCK } from '~/features/essay/mocks/ESSAY_CONTENT'
import { FindOneEssayResponseDto } from '~/services/api/api-axios'
import { CreateCorrectionDto } from '~/services/graphql/graphql'
import { textUtils } from '~/utils/text-utils'

interface EssayDetailCorrectProps {
  data: FindOneEssayResponseDto
  onSubmit: (data: CreateCorrectionDto) => void
}

export type CorrectionSentenceFormData = CreateCorrectionDto['sentences'][0]

const EssayDetailCorrect = ({ data, onSubmit }: EssayDetailCorrectProps) => {
  const sentences = useMemo(() => textUtils.splitIntoSentences(CONTENT_MOCK), [])
  console.log('sentences')
  const [overallComment, setOverallComment] = useState('')
  const [corrections, setCorrections] = useState<CorrectionSentenceFormData[]>([])

  const handleSubmitItem = useCallback((data: CorrectionSentenceFormData) => {
    setCorrections((prev) => {
      const newCorrections = [...prev]
      newCorrections[data.index] = data
      return newCorrections
    })
  }, [])

  const handleDeleteItem = useCallback((index: number) => {
    setCorrections((prev) => {
      const newCorrections = [...prev]
      delete newCorrections[index]
      return newCorrections
    })
  }, [])

  const handleSaveAll = () => {
    const items = corrections.filter(Boolean)
    const overall_comment = overallComment
    console.log('items', items)
    console.log('overall_comment', overall_comment)
  }

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Essay Correction
      </Typography>

      <Stack spacing={3}>
        {sentences.map((sentence, index) => (
          <CorrectionSentenceForm
            key={`${sentence}-${index}`}
            index={index}
            originalText={sentence}
            onSubmitItem={handleSubmitItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}

        <Box py={2}>
          <Divider />
          <Typography variant='h6' sx={{ my: 2, fontWeight: 500 }}>
            Overall Feedback
          </Typography>
          <AppInput
            placeholder='Write your overall feedback here...'
            fullWidth
            onChange={(e) => setOverallComment(e.target.value)}
          />
        </Box>

        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <AppButton onClick={handleSaveAll}>Save All</AppButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(EssayDetailCorrect)
