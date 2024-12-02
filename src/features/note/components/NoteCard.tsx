import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Bookmark, Edit2, SquareArrowOutUpRight } from 'lucide-react'
import { memo, useState } from 'react'

import TagList from '~/components/feature/TagList'
import NoteForm from '~/features/note/components/NoteForm'
import { useUpdateNote } from '~/features/note/hooks/useNoteQueries'
import { Note } from '~/services/api/api-axios'
import { convertToRelativeTime } from '~/utils/format-date'

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

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(7),
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out'
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
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNotes, setExpandedNotes] = useState<string[]>([])
  const mutate = useUpdateNote()

  const toggleExpand = (id: string) => {
    if (!isEditing) {
      setExpandedNotes((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
    }
  }

  const toggleBookmark = () => {
    mutate.mutateAsync({
      id: data.id,
      data: {
        lessonId: data.lessonId,
        isBookmarked: !data.isBookmarked
      }
    })
  }

  return (
    <Box sx={{ position: 'relative', boxShadow: 2, borderRadius: 1, '&:hover .action-icon': { opacity: 1 } }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography color='text.secondary' variant='body2'>
              {data.lesson?.title}
            </Typography>
            <IconButton
              href={`/course/${data.courseId}/learn?unitId=${data.unitId}&lessonId=${data.lessonId}`}
              size='small'
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <SquareArrowOutUpRight size={16} />
            </IconButton>
          </Box>

          {isEditing ? (
            <NoteForm data={data} onCancel={() => setIsEditing(false)} onSave={() => setIsEditing(false)} />
          ) : (
            <>
              <Typography variant='h6' gutterBottom>
                {data.title}
              </Typography>
              <ContentWrapper expanded={expandedNotes.includes(data.id)}>
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </ContentWrapper>

              {/* Rest of the view mode JSX */}
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
                <TagList tags={data.tags} />
              </Box>

              <Typography variant='caption' color='text.secondary'>
                Created on {convertToRelativeTime(data.createdAt)}
              </Typography>
            </>
          )}
        </Box>

        {!isEditing && (
          <EditButton className='action-icon' onClick={() => setIsEditing(!isEditing)}>
            <Edit2 size={20} />
          </EditButton>
        )}

        <BookmarkButton className='action-icon' bookmarked={data.isBookmarked} onClick={toggleBookmark}>
          <Bookmark size={20} className={data.isBookmarked ? 'fill-current' : ''} />
        </BookmarkButton>
      </CardContent>
    </Box>
  )
}

NoteCard.displayName = 'NoteCard'

export default memo(NoteCard)
