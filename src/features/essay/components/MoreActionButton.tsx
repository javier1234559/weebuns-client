import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { memo, useState } from 'react'

interface MoreActionButtonProps {
  onEdit: () => void
  onDelete: () => void
  onChangeStatus: () => void
}

function MoreActionButton({ onEdit, onDelete, onChangeStatus }: MoreActionButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (action: () => void) => {
    action()
    handleClose()
  }

  return (
    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        size='small'
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick(onEdit)}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Detail</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onDelete)}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onChangeStatus)}>
          <ListItemIcon>
            <SwapHorizIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Change Status</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default memo(MoreActionButton)
