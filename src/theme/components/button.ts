import { Components, Theme } from '@mui/material/styles'

export const BUTTON_STYLES: Components<Theme> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&:hover, &:active, &.Mui-focusVisible': {
          borderRadius: '8px'
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        '&:hover, &:active, &.Mui-focusVisible': {
          borderRadius: '8px'
        }
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&:hover, &:active, &.Mui-focusVisible': {
          borderRadius: '8px'
        }
      }
    }
  }
}
