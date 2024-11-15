import { globalConfig } from '~/config'
import { RouteNames } from '~/router/route-name'
import { LinkToPage } from '~/types/common'

/**
 * SideBar navigation items with links for Private Layout
 */
export const SIDEBAR_NAV_LINKS_USER_DEFAULT: Array<LinkToPage> = [
  {
    title: 'Home',
    path: RouteNames.Dashboard,
    icon: 'home'
  },
  {
    title: 'Learning Space',
    path: RouteNames.LearningSpace,
    icon: 'space'
  }
]

export const SIDEBAR_NAV_LINKS_USER: Array<LinkToPage> = [
  {
    title: 'Course',
    path: RouteNames.MyCourse,
    icon: 'course'
  },
  {
    title: 'Essay',
    path: RouteNames.Essay,
    icon: 'essay'
  },
  {
    title: 'Vocabulary',
    path: RouteNames.Vocabulary,
    icon: 'vocabulary'
  },
  {
    title: 'Note',
    path: RouteNames.Note,
    icon: 'note'
  },
  {
    title: 'Setting',
    path: RouteNames.Setting,
    icon: 'settings'
  }
]

// Add debug links
if (globalConfig.IS_DEBUG) {
  SIDEBAR_NAV_LINKS_USER_DEFAULT.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings'
  })
}
