import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}))

const CourseCardSkeleton = () => (
  <StyledCard>
    <Skeleton variant='rectangular' height={0} sx={{ paddingTop: '56.25%' }} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant='text' width='80%' height={32} sx={{ mb: 1 }} />
      <Skeleton variant='text' width='100%' height={20} sx={{ mb: 3 }} />
      <Skeleton variant='rectangular' height={8} sx={{ borderRadius: 1, mb: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant='circular' width={32} height={32} />
        <Box sx={{ ml: 1 }}>
          <Skeleton variant='text' width={100} height={20} />
          <Skeleton variant='text' width={60} height={16} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Skeleton variant='rectangular' width={80} height={24} sx={{ borderRadius: '16px' }} />
        <Skeleton variant='rectangular' width={60} height={24} sx={{ borderRadius: '16px' }} />
        <Skeleton variant='rectangular' width={70} height={24} sx={{ borderRadius: '16px' }} />
      </Box>

      <Skeleton variant='rectangular' width='100%' height={48} sx={{ borderRadius: '24px' }} />
    </CardContent>
  </StyledCard>
)

export default CourseCardSkeleton
