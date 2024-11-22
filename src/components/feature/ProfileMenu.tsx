import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '~/features/auth/authSlice'
import { clearAllCourseData } from '~/features/course/courseSlice'
import { clearAllEssayData } from '~/features/essay/essaySlice'
import { clearCurrentSpace } from '~/features/space/spaceSlice'
import { clearAllVocabData } from '~/features/vocabulary/vocabSlice'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'

const menuLinks = [
  {
    name: 'Profile',
    link: RouteNames.ME
  },
  {
    name: 'Account',
    link: RouteNames.ME
  },
  {
    name: 'Dashboard',
    link: RouteNames.Dashboard
  },
  {
    name: 'Logout',
    link: RouteNames.Logout
  }
]

function ProfileMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

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
    // Dispatch logout action
    dispatch(logout())
    //Clear all data
    dispatch(clearCurrentSpace())
    dispatch(clearAllEssayData())
    dispatch(clearAllCourseData())
    dispatch(clearAllVocabData())
    localStorage.clear()

    // Navigate to home or login page after logout
    navigate(RouteNames.Home)
  }

  return (
    <Box>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {auth.avatar_img ? (
            <Avatar src={auth.avatar_img} imgProps={{ referrerPolicy: 'no-referrer' }} alt={auth.name || 'Avatar'} />
          ) : (
            <Avatar alt='User Avatar' src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-2.webp' />
          )}
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
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuLinks.map((item) => (
          <MenuItem key={item.name} onClick={() => handleMenuItemClick(item.link, item.name)}>
            <Typography textAlign='center'>{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

ProfileMenu.displayName = 'ProfileMenu'
export default ProfileMenu
