import Box from '@mui/material/Box'

import { TextContent } from '~/features/lesson/lesson.type'

interface TextViewerProps {
  content: TextContent
}

function TextViewer({ content }: TextViewerProps) {
  return (
    <Box
      className='ql-editor'
      dangerouslySetInnerHTML={{ __html: content.html }}
      sx={{
        '& > *:first-of-type': { mt: 0 },
        '& > *:last-child': { mb: 0 }
      }}
    />
  )
}

export default TextViewer
