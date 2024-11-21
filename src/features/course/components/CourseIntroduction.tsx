import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Book, ClipboardList, Clock, Crown, GraduationCap, Sparkles, Target } from 'lucide-react'

import { LANGUAGE_LABELS, LEVEL_LABELS, TOPIC_LABELS } from '~/features/space/space.constants'
import { Course } from '~/services/api/api-axios'
import { LanguageCode, LevelCode, TopicCode } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'

interface CourseIntroductionProps {
  data: Course
}

const CourseIntroduction = ({ data }: CourseIntroductionProps) => {
  if (!data) return null

  const totalPremiumUnits = data.units?.filter((unit) => unit.isPremium).length || 0
  const totalFreeUnits = (data.units?.length || 0) - totalPremiumUnits

  return (
    <Box>
      {/* Course Header */}
      <Grid container spacing={4}>
        {/* Left Column - Course Info */}
        <Grid item xs={12} md={8}>
          <Typography variant='h3' gutterBottom>
            {data.title}
          </Typography>

          <Typography variant='subtitle1' color='text.secondary' paragraph>
            {data.description}
          </Typography>

          {/* Course Stats */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Book size={20} />
              <Typography>{LANGUAGE_LABELS[data.language as LanguageCode]}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Target size={20} />
              <Typography>
                {LEVEL_LABELS[data.minLevel as LevelCode]} → {LEVEL_LABELS[data.maxLevel as LevelCode]}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ClipboardList size={20} />
              <Typography>{data?.units?.length} units</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Sparkles size={20} /> {/* Changed icon for free units */}
              <Typography>{totalFreeUnits} free units</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Crown size={20} /> {/* Using Crown for premium units */}
              <Typography>{totalPremiumUnits} premium units</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={20} />
              <Typography variant='subtitle2' color='secondary.paper'>
                Last Update at {convertToRelativeTime(data.createdAt)}{' '}
              </Typography>
            </Box>
          </Box>

          {/* Topics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant='subtitle2' gutterBottom>
              Topics covered:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {data.topics.map((topic) => (
                <Chip key={topic} label={TOPIC_LABELS[topic as TopicCode]} size='small' />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Course Thumbnail */}
        <Grid item xs={12} md={4}>
          {data.thumbnailUrl && (
            <Paper
              elevation={2}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                height: 200,
                backgroundImage: `url(${data.thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
        </Grid>
      </Grid>

      {/* Course Content */}
      <Box sx={{ mt: 6 }}>
        <Typography variant='h5' gutterBottom>
          Course Content
        </Typography>

        {/* Units List */}
        <Grid container spacing={2}>
          {data.units?.map((unit, index) => (
            <Grid item xs={12} key={unit.id}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {unit.isPremium && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderBottomLeftRadius: 8
                    }}
                  >
                    <Typography variant='caption'>Premium</Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='h6'>{index + 1}</Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant='h6'>{unit.title}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {unit.description}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GraduationCap size={16} />
                  <Typography variant='body2'>{unit.unitWeight} points</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

CourseIntroduction.displayName = 'CourseIntroduction'
export default CourseIntroduction
