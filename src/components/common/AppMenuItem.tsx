import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { MenuItem as MenuItemType } from '~/router/menuItems'

interface AppMenuItemProps {
  item: MenuItemType
  onClick: () => void
}

export const AppMenuItem = ({ item, onClick }: AppMenuItemProps) => (
  <MenuItem
    onClick={onClick}
    sx={{
      gap: 1.5,
      minWidth: 140,
      '&:hover': {
        '& .icon': { color: 'primary.main' },
        '& .text': { color: 'primary.main' }
      }
    }}
  >
    <Box
      className='icon'
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'text.secondary'
      }}
    >
      {item.icon}
    </Box>
    <Typography className='text' sx={{ color: 'text.primary' }}>
      {item.name}
    </Typography>
  </MenuItem>
)
AppMenuItem.displayName = 'AppMenuItem'
export default AppMenuItem
