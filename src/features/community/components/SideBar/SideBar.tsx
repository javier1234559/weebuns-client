import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import AppIconButton from '~/components/common/AppIconButton'
import { AppLink } from '~/components/common/AppLink'
import AppTag from '~/components/common/AppTag'
import { MOCK_FEEDS_PICKED } from '~/features/community/mocks/feed'
import { RouteNames } from '~/router/route-name'
import { replacePathId } from '~/utils/replace-path'

function StaffPicks() {
  return (
    <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom fontWeight='bold'>
          Staff Picks
        </Typography>
        {MOCK_FEEDS_PICKED.map((item) => (
          <Box key={item.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar src={item.user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
              <Typography variant='body2' color='text.secondary'>
                {item.user.name}
              </Typography>
            </Box>
            <AppLink
              href={`${replacePathId(RouteNames.Feed, item.id)}`}
              sx={{ textDecoration: 'none !important', color: 'inherit' }}
            >
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 0.5 }}>
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
            </AppLink>
          </Box>
        ))}
        <AppLink href={RouteNames.Feed} sx={{ display: 'block', mt: 2, color: 'primary.main', textDecoration: 'none' }}>
          <Typography variant='body2'>See the full list</Typography>
        </AppLink>
      </CardContent>
    </Card>
  )
}

const topics = ['Technology', 'Science', 'Art', 'Literature', 'History']

function RecommendedTopics() {
  return (
    <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom fontWeight='bold'>
          Recommended Topics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {topics.map((topic) => (
            <AppTag key={topic} tag={topic} />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function Advertisement() {
  return (
    <Card sx={{ bgcolor: 'action.hover' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Advertisement
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          This is a sample ad banner.
        </Typography>
      </CardContent>
    </Card>
  )
}

function ActiveWriters() {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Most Active Members
        </Typography>
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={`/images/minimalist/avatar-${i}.webp`} sx={{ mr: 2 }} />
              <Box>
                <Typography variant='subtitle2'>Name {i}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {50 - i * 5} essays
                </Typography>
              </Box>
            </Box>
            <AppIconButton icon='plus'>
              <Typography variant='caption'>Follow</Typography>
            </AppIconButton>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

function Sidebar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        position: 'sticky',
        top: 24, // Adjust this value based on your layout
        // maxHeight: 'calc(100vh - 48px)', // Adjust this value based on your layout
        overflowY: 'auto',
        // Add padding to the bottom to ensure last item is fully visible when scrolled
        paddingBottom: 4
      }}
    >
      <StaffPicks />
      <RecommendedTopics />
      <Advertisement />
      <ActiveWriters />
    </Box>
  )
}

export default Sidebar
