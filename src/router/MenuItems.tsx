import { LayoutDashboard, LogOut, Sparkle, User } from 'lucide-react'
import { ReactNode } from 'react'

import { RouteNames } from '~/router/route-name'

export type UserRole = 'user' | 'admin' | 'teacher'

export interface MenuItem {
  name: string
  icon: ReactNode
  link: string
  visible?: (role: UserRole) => boolean
}

export const getMenuItems = (role: UserRole): MenuItem[] => {
  const adminItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      link: RouteNames.AdminDashboard
    },
    {
      name: 'Logout',
      icon: <LogOut size={18} />,
      link: RouteNames.Logout
    }
  ]

  const userItems: MenuItem[] = [
    {
      name: 'Upgrade',
      icon: <Sparkle size={18} />,
      link: RouteNames.Pricing
    },
    {
      name: 'Profile',
      icon: <User size={18} />,
      link: RouteNames.ME
    },
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      link: RouteNames.Dashboard
    },
    {
      name: 'Logout',
      icon: <LogOut size={18} />,
      link: RouteNames.Logout
    }
  ]

  // Return items based on role
  return role === 'admin' ? adminItems : userItems
}
