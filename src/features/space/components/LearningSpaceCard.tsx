import Edit from '@mui/icons-material/Edit'
import MoreVert from '@mui/icons-material/MoreVert'
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
import { CircleHelp, LogOut, PenLine, WholeWord } from 'lucide-react'
import React, { memo, useState } from 'react'
import toast from 'react-hot-toast'

import { AppLink } from '~/components/common/AppLink'
import DeleteModal from '~/components/modal/DeleteModal'
import { useModal } from '~/contexts/ModalContext'
import { useDeleteSpace } from '~/features/space/hooks/useSpaceQueries'
import UpdateSpaceModal from '~/features/space/modal/UpdateSpaceModal'
import { GetSpacesByUserQuery } from '~/services/graphql/graphql'
import { convertToRelativeTime } from '~/utils/format-date'

type Space = GetSpacesByUserQuery['getUserSpaces']['data'][0]

interface LearningSpaceCardProps {
  data: Space
}

function LearningSpaceCard({ data }: LearningSpaceCardProps) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { openModal } = useModal()
  const mutate = useDeleteSpace()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const updateSpacePopUp = () => {
    openModal(UpdateSpaceModal, { idSpace: data.id })
  }

  const handleDeleteSpace = async () => {
    const toastId = toast.loading('Deleting space...')
    try {
      await mutate.mutateAsync(data.id)
      toast.success('Space deleted', { id: toastId })
    } catch (error) {
      toast.error('Failed to delete space', { id: toastId })
      console.error(error)
    }
  }

  const handleDeleteConfirm = () => {
    openModal(DeleteModal, { itemName: data.name, onConfirm: handleDeleteSpace })
    handleClose()
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
        <CardMedia component='img' height='140' image='/images/minimalist/cover-2.webp' alt={data.name} />
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
          <MenuItem onClick={updateSpacePopUp}>
            <Edit fontSize='small' sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteConfirm}>
            <LogOut fontSize='small' style={{ marginRight: '8px' }} /> Delete
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
        <AppLink to={`/learning-space?spaceId=${data.id}`}>
          <Typography gutterBottom variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
            {data.name}
          </Typography>
        </AppLink>
        <Typography variant='body2' color='text.body'>
          {data.description}
        </Typography>
      </CardContent>

      {/* Footer */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          {convertToRelativeTime(data.created_at)}
        </Typography>
        <Divider sx={{ my: 1, bgcolor: 'grey.200' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ color: 'grey.400', display: 'flex', alignItems: 'center' }}
          >
            <CircleHelp style={{ marginRight: 'calc(1* var(--mui-spacing))', fontSize: 20, color: 'grey.400' }} />
            {data._count?.quizzes ?? 0}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ color: 'grey.400', display: 'flex', alignItems: 'center' }}
          >
            <PenLine style={{ marginRight: 'calc(1* var(--mui-spacing))', fontSize: 20, color: 'grey.400' }} />
            {data._count?.essays ?? 0}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ color: 'grey.400', display: 'flex', alignItems: 'center' }}
          >
            <WholeWord style={{ marginRight: 'calc(1* var(--mui-spacing))', fontSize: 20, color: 'grey.400' }} />
            {data._count?.vocabularies ?? 0}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

LearningSpaceCard.displayName = 'LearningSpaceCard'

export default memo(LearningSpaceCard)
