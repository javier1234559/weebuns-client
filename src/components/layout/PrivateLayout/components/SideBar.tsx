import { DrawerProps } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { FunctionComponent, MouseEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'

import SideBarNavList from './SideBarNavList'

import AppIconButton from '~/components/common/AppIconButton'
import { SIDE_BAR_WIDTH, TOP_BAR_DESKTOP_HEIGHT } from '~/components/layout/config'
import { useEventLogout, useIsAuthenticated } from '~/hooks/auth'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { useIsMobile } from '~/hooks/layout'
import { RootState } from '~/store/store'
import { LinkToPage } from '~/types/common'

export interface SideBarProps extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  items: Array<LinkToPage>
}

/**
 * Renders SideBar with Menu and User details
 * Actually for Authenticated users only, rendered in "Private Layout"
 * @component SideBar
 * @param {string} anchor - 'left' or 'right'
 * @param {boolean} open - the Drawer is visible when true
 * @param {string} variant - variant of the Drawer, one of 'permanent', 'persistent', 'temporary'
 * @param {function} onClose - called when the Drawer is closing
 */
const SideBar: FunctionComponent<SideBarProps> = ({ anchor, open, variant, items, onClose, ...restOfProps }) => {
  const state = useSelector((state: RootState) => state)
  const isAuthenticated = useIsAuthenticated()
  const onMobile = useIsMobile()

  const { onSwitchDarkMode } = useEventSwitchDarkMode()
  const onLogout = useEventLogout()

  const handleAfterLinkClick = useCallback(
    (event: MouseEvent) => {
      if (variant === 'temporary' && typeof onClose === 'function') {
        onClose(event, 'backdropClick')
      }
    },
    [variant, onClose]
  )

  return (
    <Drawer
      anchor={anchor}
      open={open}
      variant={variant}
      PaperProps={{
        sx: {
          width: SIDE_BAR_WIDTH,
          marginTop: onMobile ? 0 : variant === 'temporary' ? 0 : TOP_BAR_DESKTOP_HEIGHT,
          height: onMobile ? '100%' : variant === 'temporary' ? '100%' : `calc(100% - ${TOP_BAR_DESKTOP_HEIGHT})`
        }
      }}
      onClose={onClose}
    >
      <Stack
        sx={{
          height: '100%',
          padding: 2
        }}
        {...restOfProps}
        onClick={handleAfterLinkClick}
      >
        {isAuthenticated && (
          <>
            {/* <UserInfo showAvatar /> */}
            <Divider />
          </>
        )}

        <SideBarNavList items={items} showIcons />

        <Divider />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 2
          }}
        >
          <Tooltip title={`Switch to ${state.theme.mode} mode`}>
            <FormControlLabel
              label={`${state.theme.mode} mode`}
              control={<Switch checked={state.theme.mode === 'dark'} onChange={onSwitchDarkMode} />}
            />
          </Tooltip>

          {isAuthenticated && <AppIconButton icon='logout' title='Logout Current User' onClick={onLogout} />}
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default SideBar
