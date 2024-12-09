import { CheckCheck, DollarSign, GraduationCap, Users } from 'lucide-react'

export type StatType = 'users' | 'currency' | 'course' | 'coursecomplete'

export interface StatData {
  id: number
  type: StatType
  stats: {
    current: number
    previous: number
  }
}

export const STATS_CONFIG = {
  users: {
    title: 'Total Users',
    icon: Users,
    color: 'warning',
    format: (value: number) => {
      if (value < 1000) return value.toString()
      return `${(value / 1000).toFixed(1)}k+`
    }
  },
  currency: {
    title: 'Total Revenue',
    icon: DollarSign,
    color: 'warning',
    format: (value: number) => `$${value.toLocaleString()}`
  },
  course: {
    title: 'Active Courses',
    icon: GraduationCap,
    color: 'warning',
    format: (value: number) => value.toString()
  },
  coursecomplete: {
    title: 'Course Completion Rate',
    icon: CheckCheck,
    color: 'warning',
    format: (value: number) => `${value}%`
  }
} as const
