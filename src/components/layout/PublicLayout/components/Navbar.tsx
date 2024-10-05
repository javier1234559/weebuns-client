import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import AppButton from '~/components/common/AppButton'
import { AppLink } from '~/components/common/AppLink'
import ThemSwitcher from '~/components/feature/ThemSwitcher'
import { RouteNames } from '~/types/contains'
import './Navbar.scss'

const pages = ['Home', 'Blog', 'About']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar className='navbar' position='static' sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container>
        <Toolbar disableGutters>
          <AppLink href={RouteNames.Home} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <img src='/favicon.ico' alt='Logo' style={{ height: 40 }} />
          </AppLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              sx={{
                color: 'text.primary'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{
                borderRadius: 15
              }}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, ml: 'auto', mr: 2 }}>
            {pages.map((page) => (
              <AppLink
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'text.primary', display: 'block', textDecoration: 'none' }}
              >
                {page}
              </AppLink>
            ))}
          </Box>

          <Box display={'flex'} gap={2}>
            <ThemSwitcher />
            <Box>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt='Remy Sharp'
                    src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-2.webp'
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
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box display='flex' px='8'>
              <AppButton
                variant='outlined'
                to={RouteNames.Register}
                sx={{ mr: 2, color: 'inherit' }}
                size='small'
                label='Register'
              />
              <AppButton variant='black' to={RouteNames.SignIn} sx={{ mr: 2 }} size='small' label='Sign In' />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
