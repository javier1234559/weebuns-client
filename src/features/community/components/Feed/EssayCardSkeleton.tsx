import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

function EssayCardSkeleton() {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Author Section Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant='circular' width={40} height={40} />
          <Box sx={{ ml: 1.5, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Skeleton variant='text' width={100} height={24} />
              <Skeleton variant='text' width={20} height={24} />
              <Skeleton variant='text' width={80} height={24} />
            </Box>
            <Skeleton variant='text' width={140} height={20} />
          </Box>
        </Box>

        {/* Content Section Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant='text' width='80%' height={32} sx={{ mb: 1 }} />
          <Skeleton variant='text' width='100%' height={20} />
          <Skeleton variant='text' width='90%' height={20} />
        </Box>

        {/* Footer Section Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant='rounded' width={60} height={32} />
            <Skeleton variant='text' width={120} height={24} />
          </Box>
          <Skeleton variant='circular' width={32} height={32} />
        </Box>
      </Box>

      {/* Optional Image Skeleton */}
      <Skeleton variant='rectangular' height={192} />
    </Card>
  )
}

export default EssayCardSkeleton
