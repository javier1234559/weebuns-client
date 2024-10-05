import { ThemeOptions } from '@mui/material'

import { PALETTE_COLORS } from './colors'

import { TYPOGRAPHY } from '~/theme/typography'

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
  }
}

export default LIGHT_THEME
