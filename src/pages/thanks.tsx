import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'

const Thanks = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          borderRadius: 2,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2
            }}
          />
        </motion.div>

        <Typography
          variant='h4'
          component={motion.h4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          Thank You for Subscribing!
        </Typography>

        <Typography
          color='text.secondary'
          sx={{ mb: 4 }}
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your subscription has been successfully activated. You now have full access to all our premium features and
          content.
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center'
          }}
        >
          <AppButton
            variant='outlined'
            color='primary'
            size='large'
            onClick={() => navigate(RouteNames.Dashboard)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Go to Dashboard
          </AppButton>
        </Box>
      </Paper>
    </Container>
  )
}

export default Thanks
