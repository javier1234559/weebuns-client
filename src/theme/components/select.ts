import { Components, Theme } from '@mui/material/styles'

export const SELECT_STYLES: Components<Theme> = {
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: '8px'
      }
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&:hover, &:active, &.Mui-selected, &.Mui-focusVisible': {
          borderRadius: '8px'
        }
      }
    }
  }
}
