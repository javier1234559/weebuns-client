import { ThemeOptions } from '@mui/material'

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
import { SELECT_STYLES } from '~/theme/components/select'
import { SHAPE } from '~/theme/radius'
import { TYPOGRAPHY } from '~/theme/typography'

import { PALETTE_COLORS } from './colors'

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
  shape: {
    ...SHAPE
  },
  breakpoints: BREAKPOINTS,
  components: {
    ...BUTTON_STYLES,
    ...SELECT_STYLES
  }
}

export default DARK_THEME
