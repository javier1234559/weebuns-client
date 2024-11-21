import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import { Check, Trash2 } from 'lucide-react'

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: '50% !important'
    }
  },
  '&:hover': {
    borderRadius: '50% !important'
  }
}))

interface LevelButtonsProps {
  level: number
  id: string
  isHideDelete?: boolean
}

const LevelButtons = ({ id, level, isHideDelete }: LevelButtonsProps) => {
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation() // Prevent bubble
    callback()
  }

  const handleDelete = () => {
    console.log('Delete')
    console.log(id)
  }

  const handleComplete = () => {
    console.log('Complete')
  }

  const handleLevel = () => {
    console.log('Level')
  }

  return (
    <Stack direction='row' spacing={1}>
      {!isHideDelete && (
        <StyledToggleButton
          value='delete'
          onClick={(e) => handleButtonClick(e, () => handleDelete())}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            minWidth: 'auto'
          }}
        >
          <Trash2 size={16} />
        </StyledToggleButton>
      )}
      {[1, 2, 3, 4].map((num) => (
        <StyledToggleButton
          key={num}
          value={num}
          selected={level == num}
          onClick={(e) => handleButtonClick(e, handleLevel)}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            p: 0,
            minWidth: 'auto'
          }}
        >
          {num}
        </StyledToggleButton>
      ))}
      <StyledToggleButton
        value='complete'
        selected={level == 5}
        onClick={(e) => handleButtonClick(e, handleComplete)}
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          p: 0,
          minWidth: 'auto',
          bgcolor: level === 5 ? 'success.main' : ''
        }}
      >
        <Check size={16} />
      </StyledToggleButton>
    </Stack>
  )
}

LevelButtons.displayName = 'LevelButtons'
export default LevelButtons
