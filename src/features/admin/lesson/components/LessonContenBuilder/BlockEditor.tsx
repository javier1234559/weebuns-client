import Paper from '@mui/material/Paper'

import ContentEditor from '~/components/feature/Editor/ContentEditor'
import DictationEditor from '~/features/admin/lesson/components/LessonContenBuilder/DictationEditor'
import { Block, DictationContent, QuizContent, TextContent } from '~/features/lesson/lesson.type'
import { useEventSwitchDarkMode } from '~/hooks/event'

import QuizEditor from './QuizEditor'

interface BlockEditorProps {
  block: Block
  onChange: (content: TextContent | QuizContent | DictationContent) => void
}

function BlockEditor({ block, onChange }: BlockEditorProps) {
  const { isDarkMode } = useEventSwitchDarkMode()

  switch (block.type) {
    case 'text': {
      const content = block.content as TextContent
      return (
        <Paper elevation={0} variant='outlined' sx={{ p: 3 }}>
          <ContentEditor isDark={isDarkMode} content={content.html} onChangeContent={(html) => onChange({ html })} />
        </Paper>
      )
    }
    case 'quiz':
      return <QuizEditor content={block.content as QuizContent} onChange={onChange} />

    case 'dictation':
      return <DictationEditor content={block.content as DictationContent} onChange={onChange} />

    default:
      return null
  }
}

BlockEditor.displayName = 'BlockEditor'
export default BlockEditor
