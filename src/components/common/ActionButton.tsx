// components/common/ActionButton/ActionButton.tsx
import { alpha, SxProps, Theme } from '@mui/material'
import { FC } from 'react'

import AppIconButton from '~/components/common/AppIconButton'
import { AppIconButtonProps } from '~/components/common/AppIconButton/utils'

type ActionButtonVariant = 'default' | 'primary' | 'error' | 'warning' | 'success'

interface ActionButtonProps extends Omit<AppIconButtonProps, 'sx'> {
  sx?: SxProps<Theme>
  variant?: ActionButtonVariant
}

const getVariantStyles = (theme: Theme, variant: ActionButtonVariant): SxProps<Theme> => {
  const variants = {
    default: {
      backgroundColor: theme.palette.background.default,
      hoverColor: alpha(theme.palette.background.default, 0.7),
      activeColor: alpha(theme.palette.background.default, 0.5)
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      hoverColor: alpha(theme.palette.primary.main, 0.7),
      activeColor: alpha(theme.palette.primary.main, 0.5)
    },
    error: {
      backgroundColor: theme.palette.error.light,
      hoverColor: alpha(theme.palette.error.light, 0.7),
      activeColor: alpha(theme.palette.error.light, 0.5)
    },
    warning: {
      backgroundColor: theme.palette.warning.light,
      hoverColor: alpha(theme.palette.warning.light, 0.7),
      activeColor: alpha(theme.palette.warning.light, 0.5)
    },
    success: {
      backgroundColor: theme.palette.success.light,
      hoverColor: alpha(theme.palette.success.light, 0.7),
      activeColor: alpha(theme.palette.success.light, 0.5)
    }
  }

  const colors = variants[variant]

  return {
    backgroundColor: colors.backgroundColor,
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: `${colors.hoverColor} !important`
    },
    '&:active': {
      backgroundColor: `${colors.activeColor} !important`
    }
  }
}

const ActionButton: FC<ActionButtonProps> = ({ sx, variant = 'default', ...props }) => {
  return (
    <AppIconButton
      sx={(theme) => ({
        ...getVariantStyles(theme, variant),
        ...(typeof sx === 'function' ? sx(theme) : sx)
      })}
      {...props}
    />
  )
}

ActionButton.displayName = 'ActionButton'

export default ActionButton
