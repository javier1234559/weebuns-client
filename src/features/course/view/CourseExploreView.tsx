import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Clock, Search, Star } from 'lucide-react'
import { useState } from 'react'

import AppButton from '~/components/common/AppButton'
import { Select } from '~/components/ui/select'
import CourseCard from '~/features/course/components/CourseCard'
import CourseCardSkeleton from '~/features/course/components/CourseCardSekeleton'
import { useCourses, useRecommendedCourses } from '~/features/course/hooks/useCourseQueries'

function CourseExploreView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')

  // Replace with your actual data fetching
  const { data: recommendedCourses, isLoading: loadingRecommended } = useRecommendedCourses()
  const { data: allCourses, isLoading: loadingCourses } = useCourses({
    search: searchQuery,
    level: selectedLevel,
    duration: selectedDuration
  })

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Recommended Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' fontWeight={600} gutterBottom>
          Available Courses
        </Typography>

        {loadingRecommended ? (
          <CourseCardSkeleton />
        ) : (
          recommendedCourses?.map((course) => (
            <Card
              key={course.id}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper'
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Chip
                  label='Recommended for you'
                  size='small'
                  icon={<Star size={16} />}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    fontWeight: 500,
                    mb: 2
                  }}
                />
                <Typography variant='h5' gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {course.description}
                </Typography>
              </Box>

              {/* Course Thumbnail */}
              <Box
                sx={{
                  width: '100%',
                  height: 240,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  mb: 2
                }}
              >
                {/* Your thumbnail image */}
              </Box>

              {/* Course Meta */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={20} />
                    <Typography>{course.duration} weeks</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>{course.level}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star size={20} />
                    <Typography>{course.rating}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Enroll Button */}
              <AppButton
                variant='contained'
                fullWidth
                sx={{
                  height: 48,
                  bgcolor: 'black',
                  '&:hover': { bgcolor: 'black' }
                }}
              >
                Enroll Now
              </AppButton>
            </Card>
          ))
        )}
      </Box>

      {/* Search and Filters */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <TextField
          fullWidth
          placeholder='Search courses...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search size={20} />
              </InputAdornment>
            )
          }}
          sx={{ flex: 2 }}
        />

        <Select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} displayEmpty sx={{ flex: 1 }}>
          <MenuItem value=''>Select Level</MenuItem>
          <MenuItem value='beginner'>Beginner</MenuItem>
          <MenuItem value='intermediate'>Intermediate</MenuItem>
          <MenuItem value='advanced'>Advanced</MenuItem>
        </Select>

        <Select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} sx={{ flex: 1 }}>
          <MenuItem value=''>Select Duration</MenuItem>
          <MenuItem value='4'>4 weeks</MenuItem>
          <MenuItem value='8'>8 weeks</MenuItem>
          <MenuItem value='12'>12 weeks</MenuItem>
        </Select>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {loadingCourses
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <CourseCardSkeleton />
                </Grid>
              ))
          : allCourses?.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <CourseCard data={course} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default CourseExploreView
