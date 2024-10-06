import { ThemeOptions } from '@mui/material'
import { PALETTE_COLORS } from './colors'
<<<<<<< Updated upstream
=======

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
>>>>>>> Stashed changes
import { TYPOGRAPHY } from '~/theme/typography'

/**
 * MUI theme options for "Light Mode"
 */
export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    ...PALETTE_COLORS
    // background: {
    //   paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
    //   default: '#FFFFFF',
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

export default LIGHT_THEME
