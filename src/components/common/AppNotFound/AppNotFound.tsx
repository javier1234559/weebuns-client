import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'

interface AppNotFoundProps {
  title?: string
  message?: string
  backUrl?: string
  backText?: string
}

const AppNotFound = ({
  title = 'Not Found',
  message = "The resource you're looking for doesn't exist.",
  backUrl = '/',
  backText = 'Go Back'
}: AppNotFoundProps) => {
  const navigate = useNavigate()

  return (
    <Container
      maxWidth='sm'
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: '6rem',
            fontWeight: 700,
            color: 'primary.main',
            lineHeight: 1,
            mb: 1
          }}
        >
          404
        </Typography>
        <Typography
          variant='h4'
          component='h1'
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{
            maxWidth: '400px',
            mb: 2
          }}
        >
          {message}
        </Typography>
      </Box>

      <AppButton
        variant='outlined'
        size='large'
        onClick={() => navigate(backUrl)}
        sx={{
          minWidth: 200,
          height: 48
        }}
      >
        {backText}
      </AppButton>
    </Container>
  )
}

export default AppNotFound
