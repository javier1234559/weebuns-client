import { ThemeOptions } from '@mui/material'

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
import { TYPOGRAPHY } from '~/theme/typography'

import { PALETTE_COLORS } from './colors'

/**
 * MUI theme options for "Light Mode"
 */
export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    ...PALETTE_COLORS,
    background: {
      paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
      default: '#E9F0F3'
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

export default LIGHT_THEME
