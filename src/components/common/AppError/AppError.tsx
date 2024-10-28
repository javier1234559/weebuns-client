import { StackProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'

interface Props extends StackProps {
  message: string
}

const AppError: FunctionComponent<Props> = ({ message }: Props) => {
  return (
    <Box display='flex' justifyContent='center' width='100%'>
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
