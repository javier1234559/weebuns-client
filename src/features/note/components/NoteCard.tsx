import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Bookmark, SquareArrowOutUpRight } from 'lucide-react'
import { memo, useState } from 'react'

import { MOCK_NOTES, Note } from '~/features/note/mocks/MOCK_NOTES'

interface NoteCardProps {
  data: Note
}

const BookmarkButton = styled(IconButton)<{ bookmarked?: boolean }>(({ theme, bookmarked }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  opacity: bookmarked ? 1 : 0,
  transition: 'opacity 0.2s ease-in-out',
  color: bookmarked ? theme.palette.warning.main : theme.palette.text.primary
}))

const ContentWrapper = styled(Box)<{ expanded?: boolean }>(({ theme, expanded }) => ({
  position: 'relative',
  maxHeight: expanded ? 'none' : '100px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  '&:after': !expanded
    ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50px',
        background: `linear-gradient(180deg, ${theme.palette.background.paper}00 0%, ${theme.palette.background.paper} 100%)`
      }
    : {}
}))

function NoteCard({ data }: NoteCardProps) {
  const [notes, setNotes] = useState(MOCK_NOTES)
  const [expandedNotes, setExpandedNotes] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedNotes((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const toggleBookmark = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, isBookmarked: !note.isBookmarked } : note)))
  }

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .bookmark-icon': {
          opacity: 1
        }
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography color='text.secondary' variant='body2'>
              {data.title}
            </Typography>
            <IconButton
              href={`/course/${data?.unit?.courseId}/learn?unitId=${data.unitId}`}
              size='small'
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <SquareArrowOutUpRight size={16} />
            </IconButton>
          </Box>
          <Typography variant='h6' gutterBottom>
            {data.title}
          </Typography>
        </Box>

        <ContentWrapper expanded={expandedNotes.includes(data.id)}>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </ContentWrapper>

        <Box
          onClick={() => toggleExpand(data.id)}
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            color: 'primary.main',
            mb: 2
          }}
        >
          <Typography variant='button'>{expandedNotes.includes(data.id) ? 'Show Less' : 'Show More'}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <div>{Array.isArray(data.tags) && data.tags.map((tag) => <Chip key={tag} label={tag} size='small' />)}</div>
        </Box>

        <Typography variant='caption' color='text.secondary'>
          Created on {new Date(data.createdAt).toLocaleDateString()}
        </Typography>

        <BookmarkButton
          className='bookmark-icon'
          bookmarked={data.isBookmarked}
          onClick={() => toggleBookmark(data.id)}
        >
          <Bookmark size={20} className={data.isBookmarked ? 'fill-current' : ''} />
        </BookmarkButton>
      </CardContent>
    </Box>
  )
}

NoteCard.displayName = 'NoteCard'

export default memo(NoteCard)
