// import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FunctionComponent, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/store'
import { ThemeKey } from '~/store/themeSlice'
import DARK_THEME from './dark'
import LIGHT_THEME from './light'

function getThemeByDarkMode(themeState: ThemeKey) {
  switch (themeState) {
    case 'light':
      return createTheme({
        ...LIGHT_THEME,
        cssVariables: true
      })
    case 'dark':
      return createTheme({
        ...DARK_THEME,
        cssVariables: true
      })
    default:
      return createTheme({
        ...LIGHT_THEME
      })
  }
}

/**
 * Renders everything needed to get MUI theme working
 * The Light or Dark themes applied depending on global .darkMode state
 */
const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true) // True until the component is mounted
  const mode = useSelector((state: RootState) => state.theme.mode)

  useEffect(() => setLoading(false), []) // Set .loading to false when the component is mounted

  const currentTheme = useMemo(() => getThemeByDarkMode(mode), [mode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  if (loading) return null // Don't render anything until the component is mounted

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline /* MUI Styles */ enableColorScheme />
      {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider
