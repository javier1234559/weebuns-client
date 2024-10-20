import 'reactjs-tiptap-editor/style.css'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DOMPurify from 'dompurify'
import { useSelector } from 'react-redux'

import { Card } from '~/components/ui/card'
import { RootState } from '~/store/store' // Adjust this import based on your Redux setup
import { convertToRelativeTime } from '~/utils/format-date'

interface Essay {
  title: string
  content: string
  thumbnail: string
  language: string
  hashtags: string[]
  createdAt: string // Add this field to your Essay interface
}

interface EssayPreviewProps {
  data: Essay
}

function EssayPreview({ data }: EssayPreviewProps) {
  const sanitizedContent = DOMPurify.sanitize(data.content)
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      <Box sx={{ width: '100%', height: 400, overflow: 'hidden', mb: 4 }}>
        <img
          src={'https://images2.alphacoders.com/133/1335809.png'}
          alt={data.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Container maxWidth='md'>
        <Typography variant='h3' gutterBottom align='center'>
          {data.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Avatar src={auth.avatar_img || ''} alt={auth.name || ''} sx={{ width: 50, height: 50, mr: 2 }} />
          <Box>
            <Typography variant='subtitle1'>{auth.name}</Typography>
            <Typography variant='subtitle1'>24 essay</Typography>
            <Typography variant='body2' color='textSecondary'>
              {convertToRelativeTime(data.createdAt)} · {data.language}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
          {data.hashtags.map((tag, index) => (
            <Chip key={index} label={tag} variant='outlined' />
          ))}
        </Box>
        <Box
          className='tiptap-preview ProseMirror'
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          sx={{
            pb: 4,
            '& > *': { textAlign: 'justify' },
            '& img': { maxWidth: '100%', height: 'auto', display: 'block', margin: '20px auto' }
          }}
        />
      </Container>
    </Card>
  )
}

EssayPreview.displayName = 'EssayPreview'
export default EssayPreview
