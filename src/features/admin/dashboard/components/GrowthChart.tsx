import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const monthlyUserData: ChartDataItem[] = [
  { month: 'Jan', users: 2100 },
  { month: 'Feb', users: 2800 },
  { month: 'Mar', users: 2400 },
  { month: 'May', users: 2900 },
  { month: 'Jul', users: 3100 },
  { month: 'Aug', users: 3800 },
  { month: 'Sep', users: 3400 },
  { month: 'Oct', users: 4200 },
  { month: 'Nov', users: 3900 },
  { month: 'Dec', users: 3000 }
]

export const monthlyRevenueData: ChartDataItem[] = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15500 },
  { month: 'Mar', revenue: 13800 },
  { month: 'Apr', revenue: 18000 },
  { month: 'May', revenue: 16500 },
  { month: 'Jun', revenue: 19500 },
  { month: 'Jul', revenue: 17800 },
  { month: 'Aug', revenue: 22000 },
  { month: 'Oct', revenue: 25000 },
  { month: 'Nov', revenue: 20000 },
  { month: 'Dec', revenue: 10000 }
]

interface GrowthChartProps {
  data: ChartDataItem[]
  dataKey: string
  title: string
  type: 'users' | 'revenue'
}

export interface ChartDataItem {
  month: string
  [key: string]: string | number
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data, dataKey, title, type }) => {
  const theme = useTheme()
  const gradientColor = type === 'users' ? theme.palette.info.main : theme.palette.error.main

  const gradientId = `gradient-${type}`

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={gradientColor} stopOpacity={0.8} />
              <stop offset='95%' stopColor={gradientColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='month'
            stroke={theme.palette.text.secondary} // Sử dụng text.secondary cho các label
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            fontSize={12}
            tickFormatter={(value) => (type === 'revenue' ? `$${value}` : value.toString())}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper, // Sử dụng background từ theme
              border: 'none',
              boxShadow: theme.shadows[3], // Sử dụng shadow từ theme
              color: theme.palette.text.primary // Sử dụng text color từ theme
            }}
            formatter={(value) => (type === 'revenue' ? [`$${value}`, 'Value'] : [value, 'Users'])}
            labelStyle={{
              color: theme.palette.text.secondary // Style cho label tooltip
            }}
          />
          <Area
            type='monotone'
            dataKey={dataKey}
            stroke={gradientColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default GrowthChart
