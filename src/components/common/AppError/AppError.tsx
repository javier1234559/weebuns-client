import { StackProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

import AppNotFound from '~/components/common/AppNotFound/AppNotFound'

interface Props extends StackProps {
  error: any
  notFoundConfig?: {
    title?: string
    message?: string
    backUrl?: string
    backText?: string
  }
}

const AppError: FunctionComponent<Props> = ({ error, notFoundConfig, ...props }: Props) => {
  const status = error?.response?.status
  const message = error?.response?.data?.message || error?.message || 'Something went wrong'

  // Handle 404 Not Found
  if (status === 404 && notFoundConfig) {
    return (
      <AppNotFound
        title={notFoundConfig.title || 'Not Found'}
        message={notFoundConfig.message || "The resource you're looking for doesn't exist."}
        backUrl={notFoundConfig.backUrl || '/'}
        backText={notFoundConfig.backText || 'Go Back'}
      />
    )
  }

  return (
    <Box display='flex' justifyContent='center' width='100%' {...props}>
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: 'error.lighter',
          border: '1px solid',
          borderColor: 'error.light'
        }}
      >
        <Typography color='error' variant='body2'>
          {message}
        </Typography>
      </Box>
    </Box>
  )
}

export default AppError
