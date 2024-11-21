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
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { LANGUAGE_LABELS, LEVEL_LABELS, TARGET_LABELS } from '~/features/space/space.constants'
import { RouteNames } from '~/router/route-name'
import { CourseJoinedDto } from '~/services/api/api-axios'
import { LanguageCode, LevelCode, TargetCode } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'
import { replacePathId } from '~/utils/replace-path'

interface CourseCardProps {
  data?: CourseJoinedDto
}

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

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  const theme = useTheme()
  const navigator = useNavigate()

  if (!data) {
    return null
  }

  const handleStartLearnCourse = async () => {
    if (data.progress) {
      const currentUnitId = data.progress?.currentUnitId
      const courseId = data.id
      const currentContentId = data.progress?.currentUnitContentId

      if (currentUnitId) {
        navigator(
          `${replacePathId(RouteNames.CourseLearn, courseId)}?unitId=${currentUnitId}&unitContentId=${currentContentId}`
        )
      } else {
        toast.error('Failed to navigate to unit detail')
      }
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

        <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box>
            <Typography variant='h6' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
              {data.title}
            </Typography>

            <TruncatedTypography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              {data.description || 'No description available'}
            </TruncatedTypography>

            {data.progress && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
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
          </Box>

          <Box sx={{ mt: 'auto' }}>
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

            <Box>
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
                {data.progress && data.progress.lastAccessedAt
                  ? convertToRelativeTime(data.progress.lastAccessedAt)
                  : 'Not started'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
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

            <AppButton
              fullWidth
              variant='outlined'
              color='primary'
              endIcon={<ArrowRight size={20} />}
              onClick={handleStartLearnCourse}
              sx={{
                mt: 3,
                height: 48,
                borderRadius: '24px'
              }}
            >
              {hasStarted ? 'Continue Learning' : 'Start Learning'}
            </AppButton>
          </Box>
        </CardContent>
      </Box>
    </StyledCard>
  )
}

export default CourseCard
