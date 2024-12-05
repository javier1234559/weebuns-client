import Box from '@mui/material/Box'
import DOMPurify from 'dompurify'

import { TextContent } from '~/features/lesson/lesson.type'

interface TextViewerProps {
  content: TextContent
}

function TextViewer({ content }: TextViewerProps) {
  const sanitizedContent = DOMPurify.sanitize(content.html)

  return (
    <Box
      className='ql-editor'
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      sx={{
        '& > *:first-of-type': { mt: 0 },
        '& > *:last-child': { mb: 0 }
      }}
    />
  )
}

export default TextViewer
