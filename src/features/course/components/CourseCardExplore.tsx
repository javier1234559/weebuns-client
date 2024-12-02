import { styled, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { Clock, Globe, Target, TreePalm } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { memo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { LANGUAGE_LABELS, LEVEL_LABELS, TARGET_LABELS } from '~/features/space/space.constants'
import { RouteNames } from '~/router/route-name'
import { CourseWithJoinStatus } from '~/services/api/api-axios'
import { LanguageCode, LevelCode, TargetCode } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'
import { replacePathId } from '~/utils/replace-path'
import { textUtils } from '~/utils/text-utils'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}))

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: theme.palette.success.main
  }
}))

const TruncatedTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
})

interface CourseCardExploreProps {
  data?: CourseWithJoinStatus
}
const CourseCardExplore = ({ data }: CourseCardExploreProps) => {
  const theme = useTheme()
  const navigator = useNavigate()

  if (!data) return null

  const handleViewDetailCourseOrContinueLearn = () => {
    if (data.isJoined) {
      const { currentLessonId } = data.progress || {}
      const courseId = data.id

      if (currentLessonId) {
        navigator(`${replacePathId(RouteNames.CourseLearn, courseId)}?lessonId=${currentLessonId}`)
      } else {
        toast.error('Failed to navigate to unit detail')
      }
    } else {
      navigator(replacePathId(RouteNames.CourseDetail, data.id))
    }
  }

  const progress = data.progress ? (data.progress.completedWeight / data.totalWeight) * 100 : 0
  const isPremium = data.isPremium
  const hasStarted = progress > 0

  return (
    <StyledCard>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component='div'
          sx={{
            position: 'relative',
            paddingTop: '56.25%',
            backgroundColor: theme.palette.grey[100]
          }}
        >
          {data.thumbnailUrl && (
            <img
              src={data.thumbnailUrl}
              alt={data.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </CardMedia>

        <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant='h6' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
            {data.title}
          </Typography>

          <TruncatedTypography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {textUtils.truncate(textUtils.sanitize(data.description || ''), 200)}
          </TruncatedTypography>

          <Box sx={{ mt: 'auto', pt: 1 }}>
            {data.progress && (
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <Typography variant='caption' color='text.secondary'>
                    Completed
                  </Typography>
                  <Typography variant='caption' color='text.secondary' fontWeight='medium'>
                    {`${Math.round(progress)}%`}
                  </Typography>
                </Box>
                <StyledProgress variant='determinate' value={progress} />
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={data.creator?.profilePicture || undefined} alt={data.creator?.username}>
                {data.creator?.username?.[0]}
              </Avatar>
              <Box sx={{ ml: 1 }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                  {data.creator?.username}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {data.creator?.role}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Globe style={{ marginRight: '8px' }} size={20} />
                Language: {LANGUAGE_LABELS[data.language as LanguageCode]}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Target style={{ marginRight: '8px' }} size={20} />
                Level: {LEVEL_LABELS[data.minLevel as LevelCode]} → {LEVEL_LABELS[data.maxLevel as LevelCode]}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TreePalm style={{ marginRight: '8px' }} size={20} />
                Type: {TARGET_LABELS[data.courseType as TargetCode]}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Clock style={{ marginRight: '8px' }} size={20} />
                {convertToRelativeTime(data.updatedAt)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 600,
                  color: isPremium ? 'primary.main' : 'secondary.main'
                }}
              >
                {isPremium ? 'Premium' : 'Free'}
              </Typography>
            </Box>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <AppButton
                fullWidth
                variant={data.isJoined ? 'outlined' : 'contained'}
                color='primary'
                onClick={handleViewDetailCourseOrContinueLearn}
                endIcon={<ArrowRight size={20} />}
                sx={{
                  mb: 'auto',
                  height: 48,
                  borderRadius: '24px'
                }}
              >
                {data.isJoined ? (hasStarted ? 'Continue Learning' : 'Start Learning') : 'Join Course'}
              </AppButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </StyledCard>
  )
}

CourseCardExplore.displayName = 'CourseCardExplore'
export default memo(CourseCardExplore)
