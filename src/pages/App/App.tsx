import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { CourseCard } from '~/components/feature/CourseCard'

// Mock data array
const MOCK_COURSE = [
  {
    id: 1,
    name: 'Software Engineering Fundamentals',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Learn the basics of software engineering',
    memberNumber: '24 candidates',
    createdBy: 'Prof. Jane Doe'
  },
  {
    id: 2,
    name: 'Web Development Bootcamp',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Intensive course on modern web development',
    memberNumber: '36 candidates',
    createdBy: 'John Smith, Senior Developer'
  },
  {
    id: 3,
    name: 'Data Science Essentials',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Introduction to data science and machine learning',
    memberNumber: '18 candidates',
    createdBy: 'Dr. Emily Chen'
  },
  {
    id: 4,
    name: 'Mobile App Development',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Create iOS and Android apps from scratch',
    memberNumber: '30 candidates',
    createdBy: 'Alex Johnson, App Developer'
  },
  {
    id: 5,
    name: 'Mobile App Development',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Create iOS and Android apps from scratch',
    memberNumber: '30 candidates',
    createdBy: 'Alex Johnson, App Developer'
  },
  {
    id: 6,
    name: 'Mobile App Development',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Create iOS and Android apps from scratch',
    memberNumber: '30 candidates',
    createdBy: 'Alex Johnson, App Developer'
  },
  {
    id: 5,
    name: 'Mobile App Development',
    thumbnail: 'https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-12.webp',
    summary: 'Create iOS and Android apps from scratch',
    memberNumber: '30 candidates',
    createdBy: 'Alex Johnson, App Developer'
  }
]

function App() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h3' gutterBottom>
        Course List
      </Typography>
      <Grid container spacing={2}>
        {MOCK_COURSE.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
              <CourseCard
                name={course.name}
                thumbnail={course.thumbnail}
                summary={course.summary}
                memberNumber={course.memberNumber}
                createdBy={course.createdBy}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

App.displayName = 'App'
export default App
