import { ThemeOptions } from '@mui/material'

import { PALETTE_COLORS } from './colors'

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
import { TYPOGRAPHY } from '~/theme/typography'

/**
 * MUI theme options for "Dark Mode"
 */
export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...PALETTE_COLORS,
    background: {
      paper: '#000', // Gray 800 - Background of "Paper" based component
      default: '#000'
    }
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
