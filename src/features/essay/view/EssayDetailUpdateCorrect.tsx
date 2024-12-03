import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { LogOut, SaveAll } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import AppButton from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import AlertConfirmModal from '~/components/modal/AlertModal'
import { useModal } from '~/contexts/ModalContext'
import CorrectionSentenceForm from '~/features/essay/components/CorrectionSentenceForm'
import { useUpdateCorrectionEssay } from '~/features/essay/hooks/useCorrectQueries'
import { useScrollToTop } from '~/hooks/useScrollToTop'
import { FindOneEssayResponseDto } from '~/services/api/api-axios'
import { CorrectionResponseOneDto, CreateCorrectionDto } from '~/services/graphql/graphql'
import { splitIntoSentences } from '~/utils/text-utils'

interface EssayDetailUpdateCorrectProps {
  essayData: FindOneEssayResponseDto
  data: CorrectionResponseOneDto
  onSubmit: () => void
  onExit: () => void
}

export type CorrectionSentenceFormData = CreateCorrectionDto['sentences'][0]

const EssayDetailUpdateCorrect = ({ essayData, data, onSubmit, onExit }: EssayDetailUpdateCorrectProps) => {
  const sentences = useMemo(
    () => splitIntoSentences(`${essayData.essay.title}. ${essayData.essay.content}`),
    [essayData.essay.content, essayData.essay.title]
  )
  const [overallComment, setOverallComment] = useState(data.overall_comment)
  const [corrections, setCorrections] = useState<CorrectionSentenceFormData[]>([])
  const { scrollToTop } = useScrollToTop()

  const { openModal } = useModal()

  const [updateCorrection, { loading }] = useUpdateCorrectionEssay()

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
    const items = corrections.filter((item: CorrectionSentenceFormData) => {
      if (!item) return false

      // Include item if:
      // 1. It's marked as correct OR
      // 2. Has explanation OR
      // 3. Has corrected text
      return item.is_correct === true || Boolean(item.explanation?.trim()) || Boolean(item.corrected_text?.trim())
    })

    // Validate if we have any items to update
    if (items.length === 0) {
      toast.error('No corrections to update. Please make some changes first.')
      return
    }
    const loadingId = toast.loading('Update correction...')
    await updateCorrection({
      variables: {
        input: {
          id: data.id,
          sentences: items,
          overall_comment: overallComment
        }
      },
      onCompleted: () => {
        // Handle success if needed
        onSubmit() // Trigger parent onSubmit to change mode
        toast.success('Correction update successfully', { id: loadingId })
        scrollToTop()
      },
      onError: (error) => {
        toast.error(`Error updating correction: ${error?.message}`, { id: loadingId })
        console.error('Error updating correction:', JSON.stringify(error, null, 2))
      }
    })
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

  const renderSentences = useMemo(() => {
    const existingCorrections = data.sentences ?? []
    console.log('existingCorrections', JSON.stringify(existingCorrections, null, 2))

    // Create a map of corrections by index for easier lookup
    const correctionsMap = existingCorrections.reduce(
      (acc, correction) => {
        acc[correction.index] = correction
        return acc
      },
      {} as Record<number, (typeof existingCorrections)[0]>
    )

    const mergedSentences: CorrectionSentenceFormData[] = sentences.map((text, index) => {
      // Look up the correction for this index
      const existingCorrection = correctionsMap[index]

      return {
        index,
        original_text: text,
        corrected_text: existingCorrection?.correctedText ?? '',
        explanation: existingCorrection?.explanation ?? '',
        is_correct: existingCorrection?.isCorrect ?? false,
        rating: existingCorrection?.rating ?? 0
      }
    })
    console.log('mergedSentences', JSON.stringify(mergedSentences, null, 2))

    // Set the corrections to the merged sentences
    setCorrections(mergedSentences)

    return mergedSentences.map((updateSentence, index) => {
      return (
        <CorrectionSentenceForm
          key={`${updateSentence.toString}-${index}`}
          index={index}
          originalText={updateSentence.original_text}
          onSaveItem={handleInsertItem}
          onDeleteItem={handleRemoveItem}
          defaultData={updateSentence}
        />
      )
    })
  }, [data.sentences, handleInsertItem, handleRemoveItem, sentences])

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Essay Correction
      </Typography>

      <Stack spacing={3}>
        {renderSentences}
        <Box py={2}>
          <Divider />
          <Typography variant='h6' sx={{ my: 2, fontWeight: 500 }}>
            Overall Feedback
          </Typography>
          <AppInput
            placeholder='Write your overall feedback here...'
            fullWidth
            value={overallComment}
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
            onClick={handleSaveAll}
            disabled={loading}
          >
            <SaveAll size={14} />
            Save All
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  )
}

export default memo(EssayDetailUpdateCorrect)
