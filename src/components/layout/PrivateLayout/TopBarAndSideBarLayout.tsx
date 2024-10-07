import { StackProps } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'

import AppIconButton from '~/components/common/AppIconButton'
import { AppLink } from '~/components/common/AppLink'
import ErrorBoundary from '~/components/common/ErrorBoundary'
import ProfileMenu from '~/components/feature/ProfileMenu'
import SideBar, { SideBarProps } from '~/components/layout/PrivateLayout/components/SideBar'
import TopBar from '~/components/layout/PrivateLayout/components/TopBar'
import { globalConfig } from '~/config'
import { useIsAuthenticated } from '~/hooks/auth'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { useIsMobile } from '~/hooks/layout'
import { RouteNames } from '~/router/route-name'
import { LinkToPage } from '~/types/common'
import { getSideBarMini } from '~/utils/localStorage'

import {
  MINI_SIDE_BAR_WIDTH,
  SIDE_BAR_DESKTOP_ANCHOR,
  SIDE_BAR_MOBILE_ANCHOR,
  SIDE_BAR_WIDTH,
  TOP_BAR_DESKTOP_HEIGHT,
  TOP_BAR_MOBILE_HEIGHT
} from '../config'

interface Props extends StackProps {
  sidebarItems: Array<LinkToPage>
  title: string
  variant: 'sidebarAlwaysTemporary' | 'sidebarPersistentOnDesktop' | 'sidebarAlwaysPersistent'
}

const TopBarAndSideBarLayout: FunctionComponent<Props> = ({ children, sidebarItems, title, variant }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const onMobile = useIsMobile()
  const isAuthenticated = useIsAuthenticated()
  const { onSwitchDarkMode, isDarkMode } = useEventSwitchDarkMode()
  const [mini, setMini] = useState(getSideBarMini())

  const sidebarProps = useMemo((): Partial<SideBarProps> => {
    const anchor = onMobile ? SIDE_BAR_MOBILE_ANCHOR : SIDE_BAR_DESKTOP_ANCHOR
    let open = sidebarVisible
    let sidebarVariant: SideBarProps['variant'] = 'temporary'
    switch (variant) {
      case 'sidebarAlwaysTemporary':
        break
      case 'sidebarPersistentOnDesktop':
        open = onMobile ? sidebarVisible : true
        sidebarVariant = onMobile ? 'temporary' : 'persistent'
        break
      case 'sidebarAlwaysPersistent':
        open = true
        sidebarVariant = 'persistent'
        break
    }
    return { anchor, open, variant: sidebarVariant }
  }, [onMobile, sidebarVisible, variant])

  const stackStyles = useMemo(
    () => ({
      minHeight: '100vh', // Full screen height
      paddingTop: onMobile ? TOP_BAR_MOBILE_HEIGHT : TOP_BAR_DESKTOP_HEIGHT,
      paddingLeft:
        sidebarProps.variant === 'persistent' && sidebarProps.open && sidebarProps?.anchor?.includes('left')
          ? mini
            ? MINI_SIDE_BAR_WIDTH
            : SIDE_BAR_WIDTH
          : undefined,
      paddingRight:
        sidebarProps.variant === 'persistent' && sidebarProps.open && sidebarProps?.anchor?.includes('right')
          ? mini
            ? MINI_SIDE_BAR_WIDTH
            : SIDE_BAR_WIDTH
          : undefined,
      transition: 'padding 0.3s'
    }),
    [onMobile, sidebarProps, mini]
  )

  const onSideBarOpen = () => {
    if (!sidebarVisible) setSidebarVisible(true) // Don't re-render Layout when SideBar is already open
  }

  const onSideBarClose = () => {
    if (sidebarVisible) setSidebarVisible(false) // Don't re-render Layout when SideBar is already closed
  }

  const LogoButton = (
    <AppIconButton
      icon={onMobile ? 'menu' : 'logo'}
      to={sidebarProps.open ? RouteNames.Home : undefined}
      onClick={sidebarProps.open ? undefined : onSideBarOpen}
      sx={{
        hover: {
          '&:hover': { backgroundColor: 'transparent !important' }
        }
      }}
    />
  )

  const DarkModeButton = (
    <>
      <AppIconButton
        icon={isDarkMode ? 'day' : 'night'} // Variant 1
        title={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
        onClick={onSwitchDarkMode}
      />
      {isAuthenticated && <ProfileMenu />}
    </>
  )

  // Note: useMemo() is not needed for startNode, endNode. We need respect store.darkMode and so on.
  const { startNode, endNode } = sidebarProps?.anchor?.includes('left')
    ? { startNode: LogoButton, endNode: DarkModeButton }
    : { startNode: DarkModeButton, endNode: LogoButton }

  if (globalConfig.IS_DEBUG) {
    console.log('Render <TopbarAndSidebarLayout/>', {
      onMobile,
      darkMode: isDarkMode,
      sidebarProps
    })
  }

  return (
    <Stack sx={stackStyles}>
      <Stack component='header'>
        <TopBar startNode={startNode} title={title} endNode={endNode} />
        <SideBar items={sidebarItems} onClose={onSideBarClose} mini={mini} setMini={setMini} {...sidebarProps} />
      </Stack>

      <Stack
        component='main'
        flexGrow={1} // Takes all possible space
        justifyContent='space-between' // Push children content (Footer, StatusBar, etc.) to the bottom
        paddingLeft={1}
        paddingRight={1}
        paddingTop={1}
      >
        <ErrorBoundary name='Content'>
          {/* Always Render Router's Outlet */}
          <Outlet />
          {/* Also render children when it is provided */}
          {children}
          <Box component='footer' mx='auto' mt={8} py={2} textAlign='center' bgcolor='transpa'>
            <span>
              Copyright &copy; by Javier and <AppLink href='https://www.behance.net/jensuytu'>jensuytu</AppLink>
            </span>
          </Box>
        </ErrorBoundary>
      </Stack>
    </Stack>
  )
}

export default TopBarAndSideBarLayout
