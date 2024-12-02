import Box from '@mui/material/Box'
import { memo } from 'react'

import { LessonContent } from '~/features/lesson/lesson.type'

import BlockViewer from './BlockViewer'

interface LessonContentViewerProps {
  content: LessonContent
}

function LessonContentViewer({ content }: LessonContentViewerProps) {
  if (!content?.blocks || content.blocks.length === 0) {
    return null
  }

  // Sort blocks by order if needed
  const sortedBlocks = [...content.blocks].sort((a, b) => a.order - b.order)

  return (
    <Box>
      {sortedBlocks.map((block) => (
        <BlockViewer key={block.id} block={block} />
      ))}
    </Box>
  )
}

LessonContentViewer.displayName = 'LessonContentViewer'
export default memo(LessonContentViewer)
