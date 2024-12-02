import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'

import AppButton from '~/components/common/AppButton'
import { Block } from '~/features/lesson/lesson.type'

interface LessonContentBuilderToolBarProps {
  onAddBlock: (type: Block['type']) => void
}

function LessonContentBuilderToolBar({ onAddBlock }: LessonContentBuilderToolBarProps) {
  return (
    <Stack direction='row' spacing={2} mb={2}>
      <AppButton variant='outlined' startIcon={<AddIcon />} onClick={() => onAddBlock('text')}>
        Add Text
      </AppButton>
      <AppButton variant='outlined' startIcon={<AddIcon />} onClick={() => onAddBlock('quiz')}>
        Add Quiz
      </AppButton>
      <AppButton variant='outlined' startIcon={<AddIcon />} onClick={() => onAddBlock('dictation')}>
        Add Dictation
      </AppButton>
    </Stack>
  )
}

LessonContentBuilderToolBar.displayName = 'LessonContentBuilderToolBar'
export default LessonContentBuilderToolBar
