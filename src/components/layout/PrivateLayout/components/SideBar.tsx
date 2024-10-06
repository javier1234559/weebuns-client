<<<<<<< Updated upstream
import { FunctionComponent, useCallback, MouseEvent } from 'react'
import { Stack, Divider, Drawer, DrawerProps, FormControlLabel, Switch, Tooltip } from '@mui/material'
import SideBarNavList from './SideBarNavList'
import { LinkToPage } from '~/types/common'
import { useEventLogout, useIsAuthenticated } from '~/hooks/auth'
import { useIsMobile } from '~/hooks/layout'
import { useEventSwitchDarkMode } from '~/hooks/event'
import AppIconButton from '~/components/common/AppIconButton'
import { RootState } from '~/store/store'
import { useSelector } from 'react-redux'
import { SIDE_BAR_WIDTH, TOP_BAR_DESKTOP_HEIGHT } from '~/components/layout/config'
=======
import { Box, Drawer, DrawerProps, IconButton, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import { MINI_DRAWER_WIDTH, SIDE_BAR_WIDTH } from '~/components/layout/config'
import { LinkToPage } from '~/types/common'
import { setSideBarMini } from '~/utils/localStorage'
import SideBarNavList from './SideBarNavList'
>>>>>>> Stashed changes

export interface SideBarProps extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  mini: boolean
  setMini: (mini: boolean) => void
  items: Array<LinkToPage>
}

<<<<<<< Updated upstream
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

  const onSwitchDarkMode = useEventSwitchDarkMode()
  const onLogout = useEventLogout()
=======
const SideBar: React.FC<SideBarProps> = ({ mini, setMini, anchor, open, variant, items, onClose, ...restOfProps }) => {
  const handleDrawerToggle = () => {
    setMini(!mini)
    setSideBarMini(!mini)
  }
>>>>>>> Stashed changes

  const handleAfterLinkClick = useCallback(
    (event: React.MouseEvent) => {
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
          width: mini ? MINI_DRAWER_WIDTH : SIDE_BAR_WIDTH,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          overflow: 'visible'
        }
      }}
      onClose={onClose}
    >
      <Stack
        sx={{
          position: 'relative',
          height: '100%',
          padding: mini ? 1 : 2,
          overflow: 'visible'
        }}
        {...restOfProps}
        onClick={handleAfterLinkClick}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: -12,
            top: '50%',
            zIndex: 100,
            p: 0,
            border: '1px solid var(--mui-palette-divider)',
            backgroundColor: 'var(--mui-palette-background-paper)'
          }}
          onClick={handleDrawerToggle}
        >
          {mini ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
        </IconButton>

        <SideBarNavList items={items} showIcons mini={mini} />

        <Divider />
      </Stack>
    </Drawer>
  )
}

export default SideBar
