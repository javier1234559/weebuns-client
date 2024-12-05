import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppMenuItem from '~/components/common/AppMenuItem'
import { logout } from '~/features/auth/authSlice'
import { SubscriptionBadge } from '~/features/subscription/components/SubscriptionBadge'
import { getMenuItems, UserRole } from '~/router/menuItems'
import { RouteNames } from '~/router/route-name'
import { resetAllState } from '~/store/resetSlice'
import { RootState } from '~/store/store'

function ProfileMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const menuItems = useMemo(() => getMenuItems(auth.role as UserRole), [auth.role])

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuItemClick = (link: string, name: string) => {
    handleCloseUserMenu()
    if (name === 'Logout') {
      handleLogout()
    } else {
      navigate(link)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetAllState())
    localStorage.clear()
    window.location.replace(RouteNames.Home)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {auth.role === 'user' && <SubscriptionBadge />}
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
          <Avatar
            src={auth.avatar_img || 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-2.webp'}
            imgProps={{ referrerPolicy: 'no-referrer' }}
            alt={auth.name || 'Avatar'}
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems.map((item) => (
          <AppMenuItem key={item.name} item={item} onClick={() => handleMenuItemClick(item.link, item.name)} />
        ))}
      </Menu>
    </Box>
  )
}

ProfileMenu.displayName = 'ProfileMenu'
export default ProfileMenu
