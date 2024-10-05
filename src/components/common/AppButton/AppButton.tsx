import { ElementType, FunctionComponent, ReactNode, useMemo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import AppIcon from '../AppIcon'
import AppLink from '../AppLink'

import './AppButton.scss'

import { APP_BUTTON_VARIANT } from '~/components/config'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    black: true
  }
}

const MUI_BUTTON_COLORS = ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning', 'black']
const EXTEND_BUTTON_VARIANTS = ['black']

export interface AppButtonProps extends Omit<ButtonProps, 'color' | 'endIcon' | 'startIcon' | 'variant'> {
  color?: string // Not only 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  endIcon?: string | ReactNode
  label?: string // Alternate to .text
  text?: string // Alternate to .label
  startIcon?: string | ReactNode
  // Missing props
  component?: ElementType // Could be RouterLink, AppLink, <a>, etc.
  to?: string // Link prop
  href?: string // Link prop
  openInNewTab?: boolean // Link prop
  underline?: 'none' | 'hover' | 'always' // Link prop
  tooltip?: string
  variant?: 'text' | 'outlined' | 'contained' | 'black' // Added 'black'
}

const AppButton: FunctionComponent<AppButtonProps> = ({
  children,
  color: propColor = 'inherit',
  component: propComponent,
  endIcon,
  label,
  startIcon,
  sx,
  text,
  underline = 'none',
  variant = APP_BUTTON_VARIANT,
  tooltip,
  ...restOfProps
}) => {
  const iconStart: ReactNode = useMemo(
    () => (!startIcon ? undefined : typeof startIcon === 'string' ? <AppIcon icon={String(startIcon)} /> : startIcon),
    [startIcon]
  )

  const iconEnd: ReactNode = useMemo(
    () => (!endIcon ? undefined : typeof endIcon === 'string' ? <AppIcon icon={String(endIcon)} /> : endIcon),
    [endIcon]
  )

  const isMuiColor = useMemo(() => MUI_BUTTON_COLORS.includes(propColor), [propColor])

  const componentToRender =
    !propComponent && (restOfProps?.href || restOfProps?.to) ? AppLink : (propComponent ?? Button)

  const colorToRender = isMuiColor ? (propColor as ButtonProps['color']) : 'inherit'
  const sxToRender = {
    padding: '0.5rem 1rem',
    ...(propColor === 'black'
      ? {
          color: 'theme.palette.primary.contrastText',
          backgroundColor: 'theme.palette.primary.black'
        }
      : {}),
    ...(isMuiColor ? {} : { color: propColor }),
    ...sx
  }

  const isExtendedVariant = useMemo(() => EXTEND_BUTTON_VARIANTS.includes(propColor), [propColor])

  const buttonClassName = useMemo(() => {
    const classes = ['app-button']
    if (isExtendedVariant) {
      classes.push(`MuiButton-${propColor}`)
    }
    return classes.join(' ')
  }, [propColor, isExtendedVariant])

  const buttonContent = (
    <Button
      className={buttonClassName}
      component={componentToRender}
      color={colorToRender}
      endIcon={iconEnd}
      startIcon={iconStart}
      sx={sxToRender}
      variant={variant}
      {...{ ...restOfProps, underline }}
    >
      {children || label || text}
    </Button>
  )

  return tooltip ? <Tooltip title={tooltip}>{buttonContent}</Tooltip> : buttonContent
}

export default AppButton
