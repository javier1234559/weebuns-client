import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { FunctionComponent, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AppIcon from '~/components/common/AppIcon'
import { LinkToPage } from '~/types/common'

interface Props {
  items: Array<LinkToPage>
}

/**
 * Renders horizontal Navigation Bar using MUI BottomNavigation component
 * @component BottomBar
 */
const BottomBar: FunctionComponent<Props> = ({ items }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const onNavigationChange = useCallback(
    (_event: unknown, newValue: string) => {
      navigate(newValue)
    },
    [navigate]
  )

  return (
    <BottomNavigation
      value={location.pathname} // Automatically highlights bottom navigation for current page
      showLabels // Always show labels on bottom navigation, otherwise label visible only for active page
      onChange={onNavigationChange}
    >
      {items.map(({ title, path, icon }) => (
        <BottomNavigationAction key={`${title}-${path}`} label={title} value={path} icon={<AppIcon icon={icon} />} />
      ))}
    </BottomNavigation>
  )
}

export default BottomBar
