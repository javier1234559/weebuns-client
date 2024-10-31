import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Globe, MessageCircle, MoreVertical, Sprout, ThumbsUp } from 'lucide-react'
import { memo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import AppTag from '~/components/common/AppTag'
import ChangeStatusModal from '~/components/modal/ChangeStatusModal'
import { useModal } from '~/contexts/ModalContext'
import { useUpdateEssay } from '~/features/essay/hooks/useEssayQueries'
import { RouteNames } from '~/router/route-name'
import { Essay } from '~/services/api/api-axios'
import { convertToRelativeTime } from '~/utils/format-date'
import { replacePathId } from '~/utils/replace-path'
import { textUtils } from '~/utils/text-utils'

interface EssayCardProps {
  item: Essay
}

function EssayCard({ item }: EssayCardProps) {
  const { openModal } = useModal()
  const navigator = useNavigate()
  const mutate = useUpdateEssay()

  const handleClick = (id: string) => {
    const linkToNavigate = replacePathId(RouteNames.EssayDetail, id)
    navigator(linkToNavigate)
  }

  const handleMoreClick = () => {
    openModal(ChangeStatusModal, { idItem: item.id })
  }

  const handleUpvote = async () => {
    try {
      await mutate.mutateAsync({ id: item.id, data: { upvote_count: item.upvote_count + 1 } })
      // Refetch the feed data
      toast.success('Upvote updated successfully')
    } catch (error) {
      toast.error('Failed to update upvote')
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.2s ease-in-out',
        minHeight: { xs: 'auto', sm: 180 },
        '&:hover': {
          boxShadow: 1
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Author Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={item.author?.profile_picture || ''}
            alt={item.author?.username || ''}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant='body1' component='span' sx={{ fontWeight: 500 }}>
                {item.author?.username || 'Anonymous'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip size='small' label='English' variant='outlined' icon={<Globe size={12} />} />
              <Chip size='small' label='Newbie' variant='outlined' icon={<Sprout size={14} />} />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {item.language} · {convertToRelativeTime(item.created_at)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Typography
              variant='h5'
              component='button'
              onClick={() => handleClick(item.id)}
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
                width: '100%',
                textAlign: 'left',
                border: 'none',
                p: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline'
                },
                // Ensure text doesn't wrap oddly
                wordBreak: 'break-word',
                // Better readability
                lineHeight: 1.3
              }}
              title={item.title} // Shows full title on hover
              aria-label={`Read more about ${item.title}`}
            >
              {textUtils.truncate(textUtils.sanitize(item.title), 200)}
            </Typography>

            <Typography
              variant='body1'
              component='button'
              onClick={() => handleClick(item.id)}
              // For accessibility and SEO
              aria-label={`Read full article about ${item.title}`}
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                // Better readability
                lineHeight: 1.5,
                // Ensure text doesn't wrap oddly
                wordBreak: 'break-word',
                // If clickable
                width: '100%',
                textAlign: 'left',
                border: 'none',
                p: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  color: 'text.primary'
                }
              }}
            >
              {textUtils.truncate(textUtils.sanitize(item.content), 1000)}
            </Typography>
          </Box>

          {/* Optional Image */}
          {/* {item.cover_url && typeof item.cover_url === 'string' && item.cover_url.trim() !== '' && (
            <Box sx={{ ml: 'auto' }}>
              <AppImage src={item.cover_url} alt={item.title} width={180} height={180} fit='cover' rounded={1} />
            </Box>
          )} */}
        </Box>

        <Box sx={{ mt: 1 }}>
          {/* Tags */}
          <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap' }}>
            {item.hashtags?.map((hashtag, index) => {
              const { hashtag: tag } = hashtag
              if (!tag) return null
              return <AppTag key={index} tag={tag.name} variant='paper' />
            })}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Upvote */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  '&:hover': { cursor: 'pointer', color: 'primary.main' }
                }}
                onClick={handleUpvote}
              >
                <ThumbsUp size={16} />
                <Typography variant='body2'>{item.upvote_count} Upvote</Typography>
              </Box>

              {/* Comment */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  '&:hover': { cursor: 'pointer', color: 'primary.main' }
                }}
                onClick={() => handleClick(item.id)}
              >
                <MessageCircle size={16} />
                <Typography variant='body2'>{item.corrections?.length} Comment</Typography>
              </Box>
            </Box>

            {/* More Actions */}
            <IconButton
              onClick={handleMoreClick}
              size='small'
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' }
              }}
            >
              <MoreVertical size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default memo(EssayCard)