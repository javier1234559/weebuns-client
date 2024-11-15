import MoreVert from '@mui/icons-material/MoreVert'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Clock, FileText, Globe, Notebook, Settings2, Target, Trash2, TreePalm, WholeWord } from 'lucide-react'
import React, { memo, useState } from 'react'
import toast from 'react-hot-toast'

import AppLink from '~/components/common/AppLink'
import DeleteModal from '~/components/modal/DeleteModal'
import { useModal } from '~/contexts/ModalContext'
import { useDeleteSpace } from '~/features/space/hooks/useSpaceQueries'
import UpdateSpaceModal from '~/features/space/modal/UpdateSpaceModal'
import { LANGUAGE_LABELS, LEVEL_LABELS, TARGET_LABELS } from '~/features/space/space.constants'
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
        bgcolor: 'background.default',
        boxShadow: theme.shadows[2],
        borderRadius: 2,
        minWidth: 'fit-content',
        width: 'auto',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      {/* Body */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <AppLink to={`/learning-space?spaceId=${data.id}`}>
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                sx={{
                  fontWeight: 'bold',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  flexGrow: 1
                }}
              >
                {data.name}
              </Typography>
            </AppLink>
            <Box sx={{ position: 'relative', height: 'fit-content' }}>
              <IconButton
                onClick={handleClick}
                sx={{
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' }
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
                  horizontal: 'center'
                }}
              >
                <MenuItem onClick={updateSpacePopUp}>
                  <Settings2 size='20' style={{ marginRight: 4 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteConfirm}>
                  <Trash2 size='20' style={{ marginRight: 4 }} /> Delete
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <Share fontSize='small' sx={{ mr: 1 }} /> Share
                </MenuItem> */}
              </Menu>
            </Box>
          </Box>
          <Typography variant='body2' color='text.secondary' noWrap>
            {data.description}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Globe style={{ marginRight: '8px' }} size={20} />
            Language: {LANGUAGE_LABELS[data.language]}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Target style={{ marginRight: '8px' }} size={20} />
            Level: {LEVEL_LABELS[data.currentLevel]} → {LEVEL_LABELS[data.targetLevel]}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TreePalm style={{ marginRight: '8px' }} size={20} />
            Purpose: {TARGET_LABELS[data.target]}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Clock style={{ marginRight: '8px' }} size={20} />
            {convertToRelativeTime(data.updatedAt)}
          </Typography>
        </Box>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 2,
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 2,
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 'fit-content'
            }}
          >
            <FileText style={{ marginRight: '2px' }} size={20} />
            <Typography component='span' noWrap>
              {data?._count?.essays ?? 0} Essays
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 'fit-content'
            }}
          >
            <Notebook style={{ marginRight: '2px' }} size={20} />
            <Typography component='span' noWrap>
              {data?._count?.notes ?? 0} Notes
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 'fit-content'
            }}
          >
            <WholeWord style={{ marginRight: '2px' }} size={20} />
            <Typography component='span' noWrap>
              {data?._count?.vocabularies ?? 0} Vocab
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

LearningSpaceCard.displayName = 'LearningSpaceCard'

export default memo(LearningSpaceCard)
