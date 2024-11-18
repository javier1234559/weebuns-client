import { styled, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { Clock, Globe, Target, TreePalm } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import AppButton from '~/components/common/AppButton'
import { LANGUAGE_LABELS, LEVEL_LABELS, TARGET_LABELS } from '~/features/space/space.constants'
import { CourseJoinedDto } from '~/services/api/api-axios'
import { LanguageCode, LevelCode, TargetCode } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'

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

  if (!data) {
    return <LoadingSkeleton />
  }

  const progress = data.progress ? (data.progress.completedWeight / data.totalWeight) * 100 : 0
  const isPremium = data.courseType === 'PREMIUM'
  const hasStarted = progress > 0

  return (
    <StyledCard>
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

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant='h6' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
          {data.title}
        </Typography>

        <TruncatedTypography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {data.description || 'No description available'}
        </TruncatedTypography>

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
            {data.progress && data.progress.lastAccessedAt
              ? convertToRelativeTime(data.progress.lastAccessedAt)
              : 'Not started'}
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

          {/* <Box
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: '16px',
              backgroundColor: data.isPublished ? 'success.light' : 'grey.100'
            }}
          >
            <Typography variant='body2'>{data.isPublished ? 'Active' : 'Inactive'}</Typography>
          </Box> */}
        </Box>

        <AppButton
          fullWidth
          variant='contained'
          color='primary'
          endIcon={<ArrowRight size={20} />}
          sx={{
            mt: 3,
            height: 48,
            borderRadius: '24px'
          }}
        >
          {data.progress ? (hasStarted ? 'Continue Learning' : 'Start Learning') : 'Join Course'}
        </AppButton>
      </CardContent>
    </StyledCard>
  )
}

const LoadingSkeleton = () => (
  <StyledCard>
    <Skeleton variant='rectangular' height={0} sx={{ paddingTop: '56.25%' }} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant='text' width='80%' height={32} sx={{ mb: 1 }} />
      <Skeleton variant='text' width='100%' height={20} sx={{ mb: 3 }} />
      <Skeleton variant='rectangular' height={8} sx={{ borderRadius: 1, mb: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant='circular' width={32} height={32} />
        <Box sx={{ ml: 1 }}>
          <Skeleton variant='text' width={100} height={20} />
          <Skeleton variant='text' width={60} height={16} />
        </Box>
      </Box>

      {[1, 2, 3, 4].map((index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Skeleton variant='circular' width={20} height={20} sx={{ mr: 1 }} />
          <Skeleton variant='text' width='60%' height={20} />
        </Box>
      ))}

      <Skeleton variant='rectangular' width='100%' height={48} sx={{ borderRadius: '24px', mt: 3 }} />
    </CardContent>
  </StyledCard>
)

export default CourseCard
