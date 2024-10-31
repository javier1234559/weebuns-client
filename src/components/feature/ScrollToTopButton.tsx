import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Fab from '@mui/material/Fab'
import Fade from '@mui/material/Fade'
import { styled } from '@mui/material/styles'

import { useScrollToTop } from '~/hooks/useScrollToTop'

interface ScrollToTopButtonProps {
  threshold?: number
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size?: 'small' | 'medium' | 'large'
}

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  boxShadow: 'none',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[4],
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%'
  },

  '&:active': {
    boxShadow: 'none'
  },

  // Override MUI's default hover background
  '&.MuiFab-primary:hover': {
    backgroundColor: theme.palette.primary.main
  }
}))

interface ScrollToTopHook {
  isVisible: boolean
  scrollToTop: () => void
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300,
  color = 'primary',
  size = 'small'
}) => {
  const { isVisible, scrollToTop } = useScrollToTop(threshold) as ScrollToTopHook

  return (
    <Fade in={isVisible} timeout={600}>
      <StyledFab color={color} size={size} onClick={scrollToTop} aria-label='scroll to top'>
        <KeyboardArrowUpIcon />
      </StyledFab>
    </Fade>
  )
}

export default ScrollToTopButton
