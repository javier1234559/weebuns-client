<<<<<<< Updated upstream
import { FunctionComponent, MouseEventHandler } from 'react'
import { useLocation } from 'react-router'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
=======
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useLocation } from 'react-router'
import AppIcon from '~/components/common/AppIcon'
import AppLink from '~/components/common/AppLink'
>>>>>>> Stashed changes
import { LinkToPage } from '~/types/common'
import AppLink from '~/components/common/AppLink'
import AppIcon from '~/components/common/AppIcon'

interface Props extends LinkToPage {
  openInNewTab?: boolean
  selected?: boolean
  onClick?: React.MouseEventHandler
  mini?: boolean
}

const SideBarNavItem: React.FC<Props> = ({
  openInNewTab,
  icon,
  path,
  selected: propSelected = false,
  subtitle,
  title,
  onClick,
  mini
}) => {
  const theme = useTheme()
  const location = useLocation()
  const selected = propSelected || (path && path.length > 1 && location.pathname.startsWith(path)) || false

  const content = (
    <ListItemButton
      component={AppLink}
      selected={selected}
      to={path}
      href='' // Hard reset for .href property
      openInNewTab={openInNewTab}
      onClick={onClick}
      sx={{
        flexDirection: mini ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        py: mini ? 1 : 1,
        px: mini ? 0.5 : 2,
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
          borderRadius: '10px'
        }
      }}
    >
      {mini ? (
        <Box display='flex' flexDirection='column' alignItems='center'>
          <ListItemIcon
            sx={{
              minWidth: 'unset',
              justifyContent: 'center'
            }}
          >
            {icon && <AppIcon icon={icon} />}
          </ListItemIcon>
          <Typography variant='caption' align='center' sx={{ fontSize: '0.6rem', lineHeight: 1, mt: 1 }}>
            {title && title.length > 6 ? `${title.slice(0, 6)}...` : title || ''}
          </Typography>
        </Box>
      ) : (
        <>
          <ListItemIcon
            sx={{
              minWidth: 'unset',
              mr: 2,
              justifyContent: 'center'
            }}
          >
            {icon && <AppIcon icon={icon} />}
          </ListItemIcon>
          <ListItemText primary={title} secondary={subtitle} />
        </>
      )}
    </ListItemButton>
  )

  return mini ? (
    <Tooltip title={title} placement='right'>
      {content}
    </Tooltip>
  ) : (
    content
  )
}

export default SideBarNavItem
