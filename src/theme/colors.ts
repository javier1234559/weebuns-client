import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material'

const COLOR_PRIMARY: SimplePaletteColorOptions = {
  main: '#E7817C',
  light: '#F7C1B2',
  dark: '#A63E4B',
  contrastText: '#FFFFFF'
}

const COLOR_SECONDARY: SimplePaletteColorOptions = {
  main: '#F7C1B2',
  contrastText: '#ffffff'
}

// const COLOR_ERROR: SimplePaletteColorOptions = {
//   main: '#FF5630',
//   light: '#FFAC82',
//   dark: '#B71D18'
// }

const COLOR_WARNING: SimplePaletteColorOptions = {
  main: '#FCB320',
  light: '#FEDA79',
  dark: '#B57310'
}

const COLOR_INFO: SimplePaletteColorOptions = {
  main: '#35B5FF',
  light: '#85E1FF',
  dark: '#1A6AB7'
}

const COLOR_SUCCESS: SimplePaletteColorOptions = {
  main: '#74DD66',
  light: '#BBF4A5',
  dark: '#339F37'
}

/**
 * MUI colors set to use in theme.palette
 */
export const PALETTE_COLORS: Partial<PaletteOptions> = {
  primary: COLOR_PRIMARY,
  secondary: COLOR_SECONDARY,
  // error: COLOR_ERROR,
  warning: COLOR_WARNING,
  info: COLOR_INFO,
  success: COLOR_SUCCESS
}

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'dark',
//     primary: {
//       main: '#E7817C',
//       light: '#F7C1B2',
//       dark: '#A63E4B',
//       contrastText: '#FFFFFF',
//     },
//     secondary: {
//       main: '#F7C1B2',
//       contrastText: '#ffffff',
//     },
//     error: {
//       main: '#FF5630',
//       light: '#FFAC82',
//       dark: '#B71D18',
//     },
//     info: {
//       main: '#35B5FF',
//       light: '#85E1FF',
//       dark: '#1A6AB7',
//     },
//     success: {
//       main: '#74DD66',
//       light: '#BBF4A5',
//       dark: '#339F37',
//     },
//   },
// };
