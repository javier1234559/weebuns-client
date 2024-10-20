import { useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Routes from '~/router'
import { RootState } from '~/store/store'
import { setTheme } from '~/store/themeSlice' // Import the action creator with correct type

function App() {
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    const newTheme = theme.mode || (prefersDarkMode ? 'dark' : 'light')
    if (newTheme !== theme.mode) {
      dispatch(setTheme(newTheme))
    }
  }, [prefersDarkMode, theme.mode, dispatch])

  return <Routes />
}

export default App
