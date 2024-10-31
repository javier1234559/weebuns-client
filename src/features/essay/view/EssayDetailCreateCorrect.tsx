import { ApolloError } from '@apollo/client/errors'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { LogOut, SaveAll } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import AlertConfirmModal from '~/components/modal/AlertModal'
import { useModal } from '~/contexts/ModalContext'
import CorrectionSentenceForm from '~/features/essay/components/CorrectionSentenceForm'
import { useCreateCorrectByEssay } from '~/features/essay/hooks/useCorrectQueries'
import { useScrollToTop } from '~/hooks/useScrollToTop'
import { FindOneEssayResponseDto } from '~/services/api/api-axios'
import { CreateCorrectionDto } from '~/services/graphql/graphql'
import { textUtils } from '~/utils/text-utils'

interface EssayDetailCreateCorrectProps {
  data: FindOneEssayResponseDto
  onSubmit: () => void
  onExit: () => void
}

export type CorrectionSentenceFormData = CreateCorrectionDto['sentences'][0]

const EssayDetailCreateCorrect = ({ data, onSubmit, onExit }: EssayDetailCreateCorrectProps) => {
  const sentences = useMemo(
    () => textUtils.splitIntoSentences(`${data.essay.title}. ${data.essay.content}`),
    [data.essay.content, data.essay.title]
  )
  const { id = '' } = useParams<{ id: string }>()
  const [overallComment, setOverallComment] = useState('')
  const [corrections, setCorrections] = useState<CorrectionSentenceFormData[]>([])
  const { openModal } = useModal()

  const { scrollToTop } = useScrollToTop()
  const [createCorrection, { loading }] = useCreateCorrectByEssay()

  const handleInsertItem = useCallback((data: CorrectionSentenceFormData) => {
    setCorrections((prev) => {
      const newCorrections = [...prev]
      newCorrections[data.index] = data
      return newCorrections
    })
  }, [])

  const handleRemoveItem = useCallback((index: number) => {
    setCorrections((prev) => {
      const newCorrections = [...prev]
      delete newCorrections[index]
      return newCorrections
    })
  }, [])

  const handleSaveAll = async () => {
    const items = corrections.filter(Boolean)
    const overall_comment = overallComment
    const loadingId = toast.loading('Creating correction...')
    try {
      await createCorrection({
        variables: {
          input: {
            essay_id: id,
            sentences: items,
            overall_comment
          }
        }
      })
      onSubmit() // Trigger parent onSubmit to change mode
      toast.success('Correction created successfully', { id: loadingId })
      scrollToTop()
    } catch (error) {
      // Handle error
      if (error instanceof ApolloError) {
        toast.error(`Error creating correction: ${error?.message}`, { id: loadingId })
      }
      console.error('Error creating correction:', JSON.stringify(error, null, 2))
    }
  }

  const handleConfirmExit = () => {
    if (corrections.filter(Boolean).length > 0 || overallComment) {
      openModal(AlertConfirmModal, {
        message: 'You have unsaved changes. Are you sure you want to exit?',
        onConfirm: onExit
      })
    } else {
      onExit()
    }
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
            onSaveItem={handleInsertItem}
            onDeleteItem={handleRemoveItem}
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
          <AppButton
            variant='outlined'
            sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}
            onClick={handleConfirmExit}
            disabled={loading}
          >
            <LogOut size={14} />
            Cancel
          </AppButton>
          <AppButton
            variant='black'
            sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}
            disabled={loading}
            onClick={handleSaveAll}
          >
            <SaveAll size={14} />
            Save All
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(EssayDetailCreateCorrect)
