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

import { AppImage } from '~/components/common/AppImage'
import AppTag from '~/components/common/AppTag'
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
  const navigator = useNavigate()
  const mutate = useUpdateEssay()

  const handleClick = (id: string) => {
    const linkToNavigate = replacePathId(RouteNames.EssayDetail, id)
    navigator(linkToNavigate)
  }

  const handleMoreClick = () => {
    // openModal(ChangeStatusModal, { idItem: item.id })
  }

  const handleUpvote = async () => {
    try {
      await mutate.mutateAsync({ id: item.id, data: { upvote_count: item.upvoteCount + 1 } })
      // Refetch the feed data
      toast.success('Upvote updated successfully')
    } catch (error) {
      toast.error('Failed to update upvote')
      console.error(error)
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
            src={item.author?.profilePicture || ''}
            alt={item.author?.username || ''}
            imgProps={{ referrerPolicy: 'no-referrer' }}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ ml: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant='body1' component='span' sx={{ fontWeight: 500 }}>
                {item.author?.username || 'Anonymous'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: { sm: 'left', sx: 'center' },
                gap: 1,
                mb: 1,
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Box display='flex' gap={1} flexWrap='wrap'>
                <Chip size='small' label='English' variant='outlined' icon={<Globe size={12} />} />
                <Chip size='small' label='Newbie' variant='outlined' icon={<Sprout size={14} />} />
              </Box>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {item.language} · {convertToRelativeTime(item.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' } // Stack on mobile, row on desktop
          }}
        >
          <Box sx={{ flex: 1 }}>
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
                wordBreak: 'break-word',
                lineHeight: 1.3
              }}
              title={item.title}
              aria-label={`Read more about ${item.title}`}
            >
              {textUtils.truncate(textUtils.sanitize(item.title), 200)}
            </Typography>

            <Typography
              variant='body1'
              component='button'
              onClick={() => handleClick(item.id)}
              aria-label={`Read full article about ${item.title}`}
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.5,
                wordBreak: 'break-word',
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
          {item.coverUrl && typeof item.coverUrl === 'string' && item.coverUrl.trim() !== '' && (
            <Box
              sx={{
                ml: { xs: 0, sm: 'auto' }, // No margin on mobile, auto margin on desktop
                mt: { xs: 2, sm: 0 }, // Top margin on mobile only
                width: { xs: '100%', sm: 'auto' } // Full width on mobile, auto on desktop
              }}
            >
              <AppImage
                src={item.coverUrl}
                alt={item.title}
                height={180}
                sx={{
                  width: { xs: '100%', sm: 180 }
                }}
                fit='cover'
                rounded={1}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          {/* Tags */}
          <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap' }}>
            {item.hashtags?.map((hashtag, index) => {
              const { hashtag: tag } = hashtag
              if (!tag) return null
              return <AppTag key={index} tag={tag.name} variant='outlined' />
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
                <Typography variant='body2'>{item.upvoteCount} Upvote</Typography>
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
