import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '~/store/store'
import { toggleTheme } from '~/store/themeSlice'

/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const isDarkMode = mode === 'dark'
  const dispatch = useDispatch()

  const onSwitchDarkMode = useCallback(() => {
    dispatch(toggleTheme())
  }, [])

  // Toggle dark mode
  return {
    isDarkMode,
    onSwitchDarkMode
  }
}
