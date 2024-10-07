import { DrawerProps, IconButton } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import { MouseEvent, useCallback } from 'react'
import SideBarNavList from './SideBarNavList'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { MINI_DRAWER_WIDTH, SIDE_BAR_WIDTH } from '~/components/layout/config'
import { LinkToPage } from '~/types/common'
import { setSideBarMini } from '~/utils/localStorage'

export interface SideBarProps extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  mini: boolean
  setMini: (mini: boolean) => void
  items: Array<LinkToPage>
}

const SideBar: React.FC<SideBarProps> = ({ mini, setMini, anchor, open, variant, items, onClose, ...restOfProps }) => {
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

        <SideBarNavList items={items} showIcons mini={mini} />

        <Divider />
      </Stack>
    </Drawer>
  )
}
export default SideBar
