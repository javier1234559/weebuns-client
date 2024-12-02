import Paper from '@mui/material/Paper'

import DictationViewer from '~/features/lesson/components/LessonContentViewer/DictationViewer'
import QuizViewer from '~/features/lesson/components/LessonContentViewer/QuizViewer'
import TextViewer from '~/features/lesson/components/LessonContentViewer/TextViewer'
import { Block, DictationContent, QuizContent, TextContent } from '~/features/lesson/lesson.type'

interface BlockViewerProps {
  block: Block
}

function BlockViewer({ block }: BlockViewerProps) {
  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return <TextViewer content={block.content as TextContent} />
      case 'quiz':
        return <QuizViewer content={block.content as QuizContent} />
      case 'dictation':
        return <DictationViewer content={block.content as DictationContent} />
      default:
        return null
    }
  }

  return (
    <Paper
      elevation={0}
      variant='outlined'
      sx={{
        p: 3,
        mb: 2
      }}
    >
      {renderContent()}
    </Paper>
  )
}
BlockViewer.displayName = 'BlockViewer'
export default BlockViewer
