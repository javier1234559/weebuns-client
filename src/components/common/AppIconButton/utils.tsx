import { ElementType } from 'react'
import { IconButtonProps, TooltipProps } from '@mui/material'

import { AppIconProps } from '../AppIcon/AppIcon'
import { IconName } from '../AppIcon/config'

export const MUI_ICON_BUTTON_COLORS = [
  'inherit',
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning'
]

export interface AppIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?: string // Not only 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  icon?: IconName | string
  iconProps?: Partial<AppIconProps>
  // Missing props
  component?: ElementType // Could be RouterLink, AppLink, <a>, etc.
  to?: string // Link prop
  href?: string // Link prop
  openInNewTab?: boolean // Link prop
  tooltipProps?: Partial<TooltipProps>
}
