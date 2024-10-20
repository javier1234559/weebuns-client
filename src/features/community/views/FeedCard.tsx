import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

import { AppIconButton } from '~/components/common/AppIconButton'
import { IFeed } from '~/features/community/feed.type'
import { convertToRelativeTime } from '~/utils/format-date'

interface EssayCardProps {
  item: IFeed
}

function EssayCard({ item }: EssayCardProps) {
  return (
    <Card sx={{ display: 'flex', mb: 4, overflow: 'hidden', borderRadius: '8px' }}>
      <CardMedia
        component='img'
        sx={{ width: '33%', objectFit: 'cover' }}
        image={item.thumbnail}
        alt={`Thumbnail ${item.title}`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '67%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant='caption' color='text.secondary'>
            {item.lang}
          </Typography>
          <Typography variant='h6' component='div'>
            {item.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {item.excerpt}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={item.user.avatar} sx={{ mr: 2 }} />
            <Box>
              <Typography variant='subtitle2'>{item.user.name}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {convertToRelativeTime(item.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <AppIconButton icon='like' title='Like'>
              <Typography variant='caption' sx={{ ml: 1 }}>
                {item.like}
              </Typography>
            </AppIconButton>
            <AppIconButton icon='chat' title='Comment'>
              <Typography variant='caption' sx={{ ml: 1 }}>
                {item.comment}
              </Typography>
            </AppIconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default memo(EssayCard)
