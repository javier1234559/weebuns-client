import { DrawerProps } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { MouseEvent, useCallback } from 'react'

import { AppIconButton } from '~/components/common/AppIconButton'
import { AppLink } from '~/components/common/AppLink'
import { MINI_DRAWER_WIDTH, SIDE_BAR_WIDTH } from '~/components/layout/config'
import { RouteNames } from '~/router/route-name'
import { setSideBarMini } from '~/services/storage/sideBarMiniState'
import { LinkToPage } from '~/types/common'

import SideBarNavList from './SideBarNavList'

export interface SideBarProps extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  mini: boolean
  setMini: (mini: boolean) => void
  items: Array<LinkToPage>
  itemsSpace: Array<LinkToPage>
}

const SideBar: React.FC<SideBarProps> = ({
  mini,
  setMini,
  anchor,
  open,
  variant,
  items,
  itemsSpace,
  onClose,
  ...restOfProps
}) => {
  const handleDrawerToggle = () => {
    setMini(!mini)
    setSideBarMini(!mini)
  }
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

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: mini ? 'center' : 'space-between', mb: 2 }}>
          <AppLink to={RouteNames.Home}>
            <AppIconButton icon='logo' title='Logo'>
              {!mini && (
                <Typography variant='h6' marginLeft={2} fontWeight={600} color='textPrimary'>
                  Weebuns
                </Typography>
              )}
            </AppIconButton>
          </AppLink>
        </Box>

        <SideBarNavList items={items} showIcons mini={mini} />
        <Divider />

        <SideBarNavList items={itemsSpace} showIcons mini={mini} />
      </Stack>
    </Drawer>
  )
}
export default SideBar
