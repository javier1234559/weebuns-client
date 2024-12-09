import GroupsRounded from '@mui/icons-material/GroupsRounded'
import Public from '@mui/icons-material/Public'
import School from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '320px', // Fixed height for all cards
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)'
  }
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: theme.palette.primary.light,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& > svg': {
    fontSize: 32,
    color: theme.palette.primary.main
  }
}))

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const features = [
  {
    icon: <BookOpen />,
    title: 'Structured Self-Study Courses',
    description:
      'Tailored to your skill level, our courses guide you step-by-step to master grammar, pronunciation, and practical communication skills.'
  },
  {
    icon: <School />,
    title: 'Interactive Note-Taking System',
    description: 'Take personalized notes, save useful phrases, and organize your learning materials—all in one place.'
  },
  {
    icon: <GroupsRounded />,
    title: 'Vocabulary Management',
    description:
      'Track your progress, create custom word lists, and use spaced repetition to build long-term retention.'
  },
  {
    icon: <Public />,
    title: 'Community Support',
    description:
      'Practice your skills with native speakers and fellow learners in our supportive community. Receive feedback and corrections to improve faster.'
  }
]

function About() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ py: 12 }}>
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            align='center'
            sx={(theme) => ({
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            })}
          >
            About Weebuns
          </Typography>
          <Typography
            variant='h6'
            align='center'
            sx={{ mb: 8, maxWidth: '800px', mx: 'auto', color: 'text.secondary' }}
          >
            Welcome to Weebuns, your ultimate self-learning language platform designed to make language learning simple,
            effective, and empowering.
          </Typography>
        </motion.div>

        {/* Why Weebuns Section */}
        <motion.div initial='hidden' animate='visible' variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 600 }}>
              Why Weebuns?
            </Typography>
            <Typography variant='body1' paragraph sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
              Learning a new language should be a fun and rewarding experience, and that&apos;s exactly what we aim to
              deliver. With Weebuns, you can learn at your own pace, practice with confidence, and connect with a global
              community of learners. Our platform is designed to help you not just memorize words but truly understand
              and use them in real-life situations.
            </Typography>
          </motion.div>
        </motion.div>

        {/* What We Offer Section */}
        <Box sx={{ mb: 12 }}>
          <motion.div initial='hidden' animate='visible' variants={containerVariants}>
            <Typography variant='h3' component='h2' gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
              What We Offer
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <FeatureCard elevation={3}>
                      <IconWrapper>{feature.icon}</IconWrapper>
                      <Typography variant='h6' gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          // Ensure text doesn't overflow
                          flex: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Our Mission Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 4,
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.light}15, ${theme.palette.primary.main}15)`
            }}
          >
            <Typography variant='h3' component='h2' gutterBottom align='center' sx={{ fontWeight: 600 }}>
              Our Mission
            </Typography>
            <Typography
              variant='body1'
              paragraph
              align='center'
              sx={{ maxWidth: '800px', mx: 'auto', color: 'text.secondary', fontSize: '1.1rem' }}
            >
              At Weebuns, we believe language learning is about more than just words—it&apos;s about connecting with
              cultures, broadening horizons, and building bridges. Our mission is to empower learners everywhere with
              the tools and support they need to achieve their goals.
            </Typography>
            <Typography
              variant='h5'
              align='center'
              sx={{
                mt: 4,
                fontWeight: 500,
                color: 'primary.main'
              }}
            >
              Join us today and make learning a new language as easy as &quot;weens&quot;!
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  )
}

export default About
