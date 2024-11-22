import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import { Check, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import WarningModal from '~/components/modal/WarningModal'
import { useModal } from '~/contexts/ModalContext'
import calculateNextReview from '~/features/vocabulary/helper/calculateSRS'
import { useDeleteVocabulary, useUpdateVocabulary } from '~/features/vocabulary/hooks/useVocabularyQueries'
import { RepetitionLevel } from '~/features/vocabulary/vocab.type'
import { updateSelectedVocab } from '~/features/vocabulary/vocabSlice'

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: '50% !important'
    }
  },
  '&:hover': {
    borderRadius: '50% !important'
  }
}))

interface LevelButtonsProps {
  level: number
  id: string
  isHideDelete?: boolean
}

const LevelButtons = ({ id, level, isHideDelete }: LevelButtonsProps) => {
  const { openModal } = useModal()
  const dispatch = useDispatch()
  const updateMutation = useUpdateVocabulary()
  const deleteMutation = useDeleteVocabulary()

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation()
    callback()
  }

  const handleDelete = () => {
    openModal(WarningModal, {
      message: 'Are you sure you want to delete this vocabulary?',
      onConfirm: () => {
        deleteMutation.mutateAsync(id, {
          onSuccess: () => {
            toast.success('Vocabulary deleted successfully')
          },
          onError: (error) => {
            toast.error(`Failed to delete vocabulary: ${error.message}`)
          }
        })
      }
    })
  }

  const updateLevel = (newLevel: RepetitionLevel) => {
    const originalNextReview = new Date().toISOString()
    const nextReview = calculateNextReview(newLevel)
    const updateData = {
      repetitionLevel: newLevel,
      nextReview
    }

    // Optimistic update
    dispatch(
      updateSelectedVocab({
        id,
        data: updateData
      })
    )

    updateMutation.mutate(
      {
        id,
        data: updateData
      },
      {
        onError: (error) => {
          // Rollback on error
          dispatch(
            updateSelectedVocab({
              id,
              data: {
                repetitionLevel: level,
                nextReview: originalNextReview // reset to original but just use current time
              }
            })
          )
          toast.error(`Failed to update vocabulary level: ${error.message}`)
        }
      }
    )
  }

  const handleComplete = () => {
    updateLevel(RepetitionLevel.MASTERED)
  }

  const handleLevel = (selectedLevel: RepetitionLevel) => {
    console.log('selectedLevel', selectedLevel)
    if (level !== selectedLevel) {
      updateLevel(selectedLevel)
    }
  }

  return (
    <Stack direction='row' spacing={1}>
      {!isHideDelete && (
        <StyledToggleButton
          value='delete'
          onClick={(e) => handleButtonClick(e, handleDelete)}
          disabled={deleteMutation.isPending}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            minWidth: 'auto'
          }}
        >
          <Trash2 size={16} />
        </StyledToggleButton>
      )}
      {[
        RepetitionLevel.LEVEL_1,
        RepetitionLevel.LEVEL_2,
        RepetitionLevel.LEVEL_3,
        RepetitionLevel.LEVEL_4,
        RepetitionLevel.LEVEL_5
      ].map((num) => (
        <StyledToggleButton
          key={num}
          value={num}
          selected={level === num}
          disabled={updateMutation.isPending}
          onClick={(e) => handleButtonClick(e, () => handleLevel(num))}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            minWidth: 'auto'
          }}
        >
          {num}
        </StyledToggleButton>
      ))}
      <StyledToggleButton
        value='complete'
        selected={level === RepetitionLevel.MASTERED}
        disabled={updateMutation.isPending}
        onClick={(e) => handleButtonClick(e, handleComplete)}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          p: 0,
          minWidth: 'auto',
          bgcolor: level === RepetitionLevel.MASTERED ? 'success.main' : '',
          '&.Mui-selected': {
            bgcolor: 'success.main',
            '&:hover': {
              bgcolor: 'success.dark'
            }
          }
        }}
      >
        <Check size={16} />
      </StyledToggleButton>
    </Stack>
  )
}

LevelButtons.displayName = 'LevelButtons'
export default LevelButtons
