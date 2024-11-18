import Box from '@mui/material/Box'
import { ContributionCalendar, createTheme } from 'react-contribution-calendar'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import { useStatsActivityStreak } from '~/features/space/hooks/useStatsQueries'

function StreakLearningCalendar() {
  const customTheme = createTheme({
    level0: '#ebedf0',
    level1: '#9be9a8',
    level2: '#40c463',
    level3: '#30a14e',
    level4: '#216e39'
  })
  const { data, error, isLoading } = useStatsActivityStreak()

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError message={error?.message || 'An error occurred'} />

  return (
    <>
      <style>
        {`
       table {
        margin: auto !important;
      }
    `}
      </style>
      <ContributionCalendar
        className='contribution-calendar'
        style={{ width: '100%', height: '100%', margin: 'auto' }}
        textColor='var(--mui-palette-text-primary)'
        data={data.activities}
        start={data.activities[data.activities.length - 1].date}
        end={data.activities[0].date}
        daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        startsOnSunday={true}
        includeBoundary={true}
        scroll
        theme={customTheme}
        cx={16}
        cy={16}
        cr={2}
        onCellClick={(e, data) => console.log(data)}
      />
    </>
  )
}

export default StreakLearningCalendar
