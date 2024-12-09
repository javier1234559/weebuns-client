import { ChartDataItem } from '~/features/admin/dashboard/components/GrowthChart'

const MONTH_MAP: { [key: string]: string } = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

export const formatGrowthData = (
  apiData: Array<{ date: string; value: string | number }>,
  type: 'users' | 'revenue'
): ChartDataItem[] => {
  // Create an object with all months initialized to 0
  const defaultData: { [key: string]: number } = Object.values(MONTH_MAP).reduce(
    (acc, month) => ({
      ...acc,
      [month]: 0
    }),
    {}
  )

  // Fill in actual values from API data
  apiData.forEach((item) => {
    const [_year, month] = item.date.split('-')
    const monthName = MONTH_MAP[month]
    defaultData[monthName] = type === 'revenue' ? Number(item.value) : Number(item.value)
  })

  // Convert to array format needed for chart
  return Object.entries(defaultData).map(([month, value]) => ({
    month,
    [type]: value
  }))
}
