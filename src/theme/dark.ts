import { ThemeOptions } from '@mui/material'
import { PALETTE_COLORS } from './colors'
<<<<<<< Updated upstream
=======

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
>>>>>>> Stashed changes
import { TYPOGRAPHY } from '~/theme/typography'

/**
 * MUI theme options for "Dark Mode"
 */
export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...PALETTE_COLORS
    // background: {
    //   paper: '#424242', // Gray 800 - Background of "Paper" based component
    //   default: '#121212',
    // },
  },
  typography: {
    ...TYPOGRAPHY
  },
  breakpoints: BREAKPOINTS,
  components: {
    ...BUTTON_STYLES
  }
}

export default DARK_THEME
