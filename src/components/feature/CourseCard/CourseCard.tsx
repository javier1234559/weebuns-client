import Edit from '@mui/icons-material/Edit'
import MoreVert from '@mui/icons-material/MoreVert'
import Person from '@mui/icons-material/Person'
import Share from '@mui/icons-material/Share'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { LogOut } from 'lucide-react'
import React, { memo, useState } from 'react'

interface CourseCardProps {
  name: string
  thumbnail: string
  summary: string
  memberNumber: string
  createdBy: string
}

function CourseCard({ thumbnail, name, summary, memberNumber, createdBy }: CourseCardProps) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: theme.palette.background.paper,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia component='img' height='140' image={thumbnail} alt={name} />
        <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white'
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleClose}>
            <Edit fontSize='small' sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LogOut fontSize='small' style={{ marginRight: '8px' }} /> Leave
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Share fontSize='small' sx={{ mr: 1 }} /> Share
          </MenuItem>
        </Menu>
      </Box>

      {/* Body */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          '&:last-child': { pb: 2 }
        }}
      >
        <Typography gutterBottom variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant='body2' color='text.body'>
          {summary}
        </Typography>
      </CardContent>

      {/* Footer */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          {createdBy}
        </Typography>
        <Divider sx={{ my: 1, bgcolor: 'grey.700' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Person sx={{ mr: 1, fontSize: 20, color: 'grey.400' }} />
          <Typography variant='body2' color='text.secondary' sx={{ color: 'grey.400' }}>
            {memberNumber}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

CourseCard.displayName = 'CourseCard'

export default memo(CourseCard)
