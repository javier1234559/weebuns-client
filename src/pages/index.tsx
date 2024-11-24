import Assignment from '@mui/icons-material/Assignment'
import PlayCircle from '@mui/icons-material/PlayCircle'
import School from '@mui/icons-material/School'
import Timeline from '@mui/icons-material/Timeline'
import TipsAndUpdates from '@mui/icons-material/TipsAndUpdates'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

import AppButton from '~/components/common/AppButton'
import { useCounter } from '~/hooks/useCountUp'
import { RouteNames } from '~/router/route-name'

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText
}))

const features = [
  {
    icon: <School fontSize='large' />,
    title: 'Self-Paced Learning',
    description: 'Learn at your own speed with personalized study plans and adaptive lessons'
  },
  {
    icon: <TipsAndUpdates fontSize='large' />,
    title: 'Smart Corrections',
    description: 'Get instant feedback and detailed explanations for your language practice'
  },
  {
    icon: <Assignment fontSize='large' />,
    title: 'Interactive Notes',
    description: 'Create and organize your study materials with our intelligent note-taking system'
  },
  {
    icon: <Timeline fontSize='large' />,
    title: 'Progress Tracking',
    description: 'Monitor your improvement with detailed analytics and achievement metrics'
  }
]

const stats = [
  {
    end: 50,
    label: 'Active Learners',
    format: 'k+'
  },
  {
    end: 30,
    label: 'Languages',
    format: '+'
  },
  {
    end: 95,
    label: 'Success Rate',
    format: '%'
  },
  {
    end: 1000,
    label: 'Lessons Completed',
    format: 'k+'
  }
]

interface StatItemProps {
  end: number
  label: string
  format?: string
  delay?: number
}

const StatItem = ({ end, label, format, delay = 0 }: StatItemProps) => {
  const { count, elementRef } = useCounter({
    end,
    duration: 2000,
    delay
  })

  const formatValue = (value: number, format?: string) => {
    if (format === 'k+') return `${value}k+`
    if (format === '%') return `${value}%`
    if (format === 'hours') return '24/7'
    if (format === '+') return `${value}+`
    return value.toString()
  }

  return (
    <StatsCard elevation={0} ref={elementRef}>
      <Typography variant='h3' fontWeight='bold'>
        {formatValue(count, format)}
      </Typography>
      <Typography variant='subtitle1' color='text.secondary'>
        {label}
      </Typography>
    </StatsCard>
  )
}

function Landing() {
  return (
    <Box component='main'>
      {/* Hero Section */}
      <Container maxWidth='lg' sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography
                variant='h1'
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                <Box
                  component='span'
                  color='primary.main'
                  sx={{
                    display: 'block',
                    fontSize: { xs: '3rem', md: '3.5rem' },
                    mb: 1
                  }}
                >
                  Weebuns
                </Box>
                Your Self-Learning{' '}
                <Box component='span' color='primary.main'>
                  Language
                </Box>{' '}
                Platform
              </Typography>

              <Typography
                variant='h6'
                color='text.secondary'
                sx={{
                  mb: 4,
                  lineHeight: 1.7,
                  fontWeight: 'normal',
                  maxWidth: '600px'
                }}
              >
                Take control of your language learning journey with our powerful tools: structured self-study courses,
                interactive note-taking system, vocabulary management, and a supportive community for practice and
                corrections.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <AppButton
                  variant='black'
                  to={RouteNames.Login}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  Start Learning Free
                </AppButton>
                <AppButton
                  variant='outlined'
                  sx={{
                    border: (theme) => `2px solid ${theme.palette.primary.main}`,
                    color: 'primary.main',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  Explore Courses
                  <PlayCircle sx={{ ml: 1 }} />
                </AppButton>
              </Stack>
            </motion.div>
          </Grid>

          {/* Hero Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: '400px'
            }}
          >
            {/* Blur Effect Background */}
            <Box
              sx={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                background: (theme) => theme.palette.primary.main,
                opacity: 0.15,
                filter: 'blur(50px)',
                transform: 'translateY(40px)',
                borderRadius: '50%',
                zIndex: 0
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                component='img'
                src='/images/hero.png'
                alt='Weebuns Learning Community'
                sx={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatItem end={stat.end} label={stat.label} format={stat.format} delay={index * 100} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth='lg' sx={{ py: 12 }}>
        <Typography variant='h2' textAlign='center' fontWeight='bold' sx={{ mb: 6 }}>
          Why Choose Weebuns?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard>
                  <CardContent>
                    <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
                    <Typography variant='h6' component='h3' gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 12 }}>
        <Container maxWidth='md'>
          <Typography variant='h3' textAlign='center' fontWeight='bold' sx={{ mb: 3 }}>
            Start Your Language Learning Journey Today
          </Typography>
          <Typography textAlign='center' variant='h6' sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of successful language learners and achieve your goals with our comprehensive learning
            platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AppButton
                variant='black'
                sx={{
                  color: 'background.black'
                }}
                to={RouteNames.Login}
              >
                Begin Learning Now
              </AppButton>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
export default Landing
