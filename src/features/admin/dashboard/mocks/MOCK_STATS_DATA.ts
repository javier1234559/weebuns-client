import { StatData } from '../../dashboard/dashboard.type'

export const MOCK_STATS_DATA: StatData[] = [
  {
    id: 1,
    type: 'users',
    stats: { current: 3500, previous: 2916 }
  },
  {
    id: 2,
    type: 'currency',
    stats: { current: 17500, previous: 15217 }
  },
  {
    id: 3,
    type: 'course',
    stats: { current: 25, previous: 23 }
  },
  {
    id: 4,
    type: 'coursecomplete',
    stats: { current: 68, previous: 64.8 }
  }
]
