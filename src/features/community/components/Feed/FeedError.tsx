import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function FeedError({ message }: { message: string }) {
  return (
    <Grid item xs={12} md={8}>
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
    </Grid>
  )
}
export default FeedError
