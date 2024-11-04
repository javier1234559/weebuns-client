import 'reactjs-tiptap-editor/style.css'

import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DOMPurify from 'dompurify'
import { Flame, Globe, Sprout } from 'lucide-react'
import { useSelector } from 'react-redux'

import AppTag from '~/components/common/AppTag'
import { Card } from '~/components/ui/card'
import { EssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'
import { RootState } from '~/store/store'
import { convertToRelativeTime } from '~/utils/format-date'

interface EssayPreviewProps {
  data: EssayFormData
}

function EssayPreview({ data }: EssayPreviewProps) {
  const theme = useTheme()
  const sanitizedContent = DOMPurify.sanitize(data.content)
  const auth = useSelector((state: RootState) => state.auth)

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', p: 2 }}>
      <Container>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {data.hashtags.map((tag, index) => (
            <AppTag key={index} tag={tag || ''} variant={'filled'} />
          ))}
        </Box>
        <Typography variant='h2' gutterBottom fontWeight={600}>
          {data.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label='English' variant='outlined' icon={<Globe size={18} />} />
          <Chip label='Newbie' variant='outlined' icon={<Sprout size={18} />} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={auth.avatar_img || ''} alt={auth.name || ''} sx={{ width: 50, height: 50, mr: 2 }} />
          <Box>
            <Typography variant='subtitle1'>{auth.name}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {convertToRelativeTime(new Date().toISOString())}
            </Typography>
          </Box>
          <Box ml='auto'>
            <Typography variant='subtitle1' style={{ marginTop: 4, textAlign: 'right' }}>
              <span style={{ verticalAlign: 'middle' }}>
                <Flame size={16} style={{ marginRight: 2, color: theme.palette.primary.main }} />
              </span>
              24 streaks
            </Typography>
          </Box>
        </Box>

        {data.cover_url && (
          <Box sx={{ width: '100%', height: 400, overflow: 'hidden', mb: 4 }}>
            <img
              src={data.cover_url || ''}
              alt={data.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
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
