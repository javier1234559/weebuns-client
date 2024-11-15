import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { FileText, GraduationCap, Notebook, WholeWord } from 'lucide-react'
import React from 'react'

import { useStatsOverview } from '~/features/space/hooks/useStatsQueries'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  loading?: boolean
}

const StatsCard = ({ title, value, icon, description, loading }: StatsCardProps) => (
  <Card
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => theme.shadows[4]
      }
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <Skeleton width={60} height={40} />
        ) : (
          <Typography variant='h4' fontWeight='bold'>
            {value}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
    </Box>
    <Typography variant='body2' color='text.secondary' sx={{ mt: 'auto' }}>
      {description}
    </Typography>
  </Card>
)

const StatsSpaceOverview = () => {
  const { data, isLoading } = useStatsOverview()

  const stats = [
    {
      title: 'Total Essays',
      value: data?.essayCount ?? 0,
      icon: <FileText size={24} />,
      description: 'Essays written and reviewed'
    },
    {
      title: 'Vocabulary',
      value: data?.vocabCount ?? 0,
      icon: <WholeWord size={24} />,
      description: 'Words learned and practiced'
    },
    {
      title: 'Courses Joined',
      value: data?.courseJoinedCount ?? 0,
      icon: <GraduationCap size={24} />,
      description: 'Active learning courses'
    },
    {
      title: 'Study Notes',
      value: data?.notesCount ?? 0,
      icon: <Notebook size={24} />,
      description: 'Personal study notes'
    }
  ]

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h5' gutterBottom sx={{ mb: 3 }}>
        Learning Overview
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} loading={isLoading} />
        ))}
      </Box>
    </Box>
  )
}

export default StatsSpaceOverview
