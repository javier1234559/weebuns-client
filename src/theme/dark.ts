import { ThemeOptions } from '@mui/material'

import { PALETTE_COLORS } from './colors'

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
  }
}

export default DARK_THEME
