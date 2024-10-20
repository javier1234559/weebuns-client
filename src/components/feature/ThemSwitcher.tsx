import { AppIconButton } from '~/components/common/AppIconButton'
import { useEventSwitchDarkMode } from '~/hooks/event'

function ThemSwitcher() {
  const { onSwitchDarkMode, isDarkMode } = useEventSwitchDarkMode()

  return (
    <AppIconButton
      icon={isDarkMode ? 'night' : 'day'}
      title={isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
      onClick={onSwitchDarkMode}
    />
  )
}

export default ThemSwitcher
