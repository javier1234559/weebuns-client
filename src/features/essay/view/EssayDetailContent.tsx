import 'reactjs-tiptap-editor/style.css'

import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DOMPurify from 'dompurify'
import { Flame, Globe, Sprout } from 'lucide-react'

import AppTag from '~/components/common/AppTag'
import { FindOneEssayResponseDto } from '~/services/api/api-axios'
import { convertToRelativeTime } from '~/utils/format-date'

interface EssayDetailContentProps {
  data: FindOneEssayResponseDto
}

function EssayDetailContent({ data }: EssayDetailContentProps) {
  const theme = useTheme()
  const { essay } = data
  const sanitizedContent = DOMPurify.sanitize(essay.content)

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
        {essay.hashtags?.map((hashtag, index) => {
          const { hashtag: tag } = hashtag
          if (!tag) return null
          return <AppTag key={index} tag={tag.name} variant={'filled'} />
        })}
      </Box>
      <Typography variant='h2' gutterBottom fontWeight={600}>
        {essay.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Chip label='English' variant='outlined' icon={<Globe size={18} />} />
        <Chip label='Newbie' variant='outlined' icon={<Sprout size={18} />} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={essay.author?.profile_picture || ''}
          alt={essay.author?.username || ''}
          sx={{ width: 50, height: 50, mr: 2 }}
        />
        <Box>
          <Typography variant='subtitle1'>{essay.author?.username || ''}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {convertToRelativeTime(essay.created_at)}
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

      <Box sx={{ width: '100%', height: 400, overflow: 'hidden', mb: 4 }}>
        <img
          src={'https://images2.alphacoders.com/133/1335809.png'}
          alt={essay.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
    </>
  )
}

EssayDetailContent.displayName = 'EssayDetailContent'
export default EssayDetailContent
