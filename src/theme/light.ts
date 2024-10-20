import { ThemeOptions } from '@mui/material'

import { BREAKPOINTS } from '~/theme/breakpoint'
import { BUTTON_STYLES } from '~/theme/components/button'
import { SELECT_STYLES } from '~/theme/components/select'
import { SHAPE } from '~/theme/radius'
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
      paper: '#FFFFFF', // Gray 100 - Background of "Paper" based component
      default: '#F6F7FB'
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

export default LIGHT_THEME
