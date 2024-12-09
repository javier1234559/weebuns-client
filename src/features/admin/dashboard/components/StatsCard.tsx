import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useCallback } from 'react'

import { STATS_CONFIG } from '~/features/admin/dashboard/dashboard.type'
import { useCounter } from '~/hooks/useCountUp'
import { StatItemDto } from '~/services/api/api-axios'

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2)
}))

interface StatsCardProps {
  data: StatItemDto
}

const StatsCard = ({ data }: StatsCardProps) => {
  const config = STATS_CONFIG[data.type]
  const Icon = config.icon

  // Ensure stats values are numbers
  const currentValue = Number(data.stats.current) || 0
  const previousValue = Number(data.stats.previous) || 0

  const { count, elementRef } = useCounter({
    end: data.stats.current,
    duration: 2000,
    delay: 0
  })

  const calculateChange = useCallback((current: number, previous: number): string => {
    // Handle cases where previous is 0 or undefined
    if (!previous) {
      return current > 0 ? '+100% from last month' : '0% from last month'
    }

    const percentageChange = ((current - previous) / previous) * 100

    // Handle Infinity or NaN
    if (!isFinite(percentageChange)) {
      return '0% from last month'
    }

    return `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}% from last month`
  }, [])

  return (
    <StyledCard ref={elementRef}>
      <Box>
        <IconWrapper
          sx={{
            backgroundColor: `${config.color}.lighter`,
            color: `${config.color}.main`
          }}
        >
          <Icon size={24} />
        </IconWrapper>
        <Typography color='text.secondary' variant='subtitle2'>
          {config.title}
        </Typography>
        <Typography variant='h4' sx={{ my: 1, fontWeight: 'bold' }}>
          {config.format(count)}
        </Typography>
      </Box>
      <Typography variant='body2' color='success.main' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {calculateChange(currentValue, previousValue)}
      </Typography>
    </StyledCard>
  )
}

export default StatsCard
