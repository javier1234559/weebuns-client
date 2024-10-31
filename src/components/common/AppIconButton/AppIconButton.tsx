import { alpha, IconButtonProps } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { ElementType, FunctionComponent, useMemo } from 'react'

import AppIcon from '~/components/common/AppIcon'
import { AppLink } from '~/components/common/AppLink'

import { AppIconButtonProps, MUI_ICON_BUTTON_COLORS } from './utils'

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'customColor'
})<{ customColor?: string; component?: ElementType }>(({ customColor }) => ({
  '&.MuiIconButton-root': {
    ...(customColor && {
      color: customColor,
      '&:hover': {
        backgroundColor: alpha(customColor, 0.04)
      }
    })
  },
  '&&': {
    height: 'fit-content'
  }
}))

interface StyledIconButtonProps extends IconButtonProps {
  customColor?: string
  component?: ElementType
}

const AppIconButton: FunctionComponent<AppIconButtonProps> = ({
  color = 'default',
  component,
  children,
  disabled,
  icon,
  iconProps,
  sx,
  title,
  tooltipProps,
  ...restOfProps
}) => {
  const componentToRender = !component && (restOfProps?.href || restOfProps?.to) ? AppLink : (component ?? IconButton)

  const isMuiColor = useMemo(() => MUI_ICON_BUTTON_COLORS.includes(color), [color])

  const iconButtonToRender = useMemo(() => {
    const colorToRender = isMuiColor ? (color as IconButtonProps['color']) : 'default'

    return (
      <StyledIconButton
        {...(restOfProps as StyledIconButtonProps)}
        component={componentToRender as ElementType}
        color={colorToRender}
        customColor={!isMuiColor ? color : undefined}
        disabled={disabled}
        sx={sx}
      >
        <AppIcon icon={icon} {...iconProps} />
        {children}
      </StyledIconButton>
    )
  }, [color, componentToRender, children, disabled, icon, isMuiColor, sx, iconProps, restOfProps])

  return title && !disabled ? (
    <Tooltip title={title} {...tooltipProps}>
      {iconButtonToRender}
    </Tooltip>
  ) : (
    iconButtonToRender
  )
}

export default AppIconButton
