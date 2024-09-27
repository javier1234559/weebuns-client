import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '~/store/themeSlice'

/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  const dispatch = useDispatch()

  // Toggle dark mode
  return useCallback(() => {
    dispatch(toggleTheme()) // Dispatches the toggleTheme action
  }, [dispatch])
}
