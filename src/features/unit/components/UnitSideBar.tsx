import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { CheckCircle, Lock } from 'lucide-react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Unit } from '~/services/api/api-axios'
import { RootState } from '~/store/store'

interface UnitSidebarProps {
  units: Unit[]
}

const UnitSidebar = ({ units }: UnitSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentUnitId = searchParams.get('unitId')
  const currentProgress = useSelector((state: RootState) => state.course.currentCourseProgress)
  const completedUnits = currentProgress.completedUnits

  // TODO: Get this from user state/context
  const isUserPremium = false

  const handleUnitClick = (unitId: string) => {
    setSearchParams((prev) => {
      prev.set('unitId', unitId)
      prev.delete('unitContentId')
      return prev
    })
  }

  return (
    <Box>
      <List sx={{ py: 0 }}>
        {units.map((unit) => {
          const isCompleted = completedUnits.includes(unit.id)
          const isSelected = currentUnitId === unit.id
          const isUnitPremium = unit.isPremium

          // Show lock only if unit is premium and user is not premium and unit is not completed
          const showLock = isUnitPremium && !isUserPremium && !isCompleted

          // Disable click if unit is premium and user is not premium and unit is not completed
          const isDisabled = isUnitPremium && !isUserPremium && !isCompleted

          return (
            <ListItem
              key={unit.id}
              disablePadding
              divider
              sx={{
                backgroundColor: isCompleted ? 'success.light' : 'inherit'
              }}
            >
              <ListItemButton
                selected={isSelected}
                disabled={isDisabled}
                onClick={() => handleUnitClick(unit.id)}
                sx={{
                  borderRadius: 0,
                  '&.Mui-selected': {
                    backgroundColor: !isCompleted ? 'var(--mui-palette-background-default)' : 'success.light',
                    '&:hover': {
                      borderRadius: 0,
                      backgroundColor: !isCompleted ? 'var(--mui-palette-background-default)' : 'success.light'
                    }
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <Typography
                        variant='body1'
                        component='span'
                        sx={{
                          fontWeight: isSelected ? 600 : 400
                        }}
                      >
                        {unit.title}
                      </Typography>
                      {showLock && <Lock size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />}
                    </Box>
                  }
                  secondary={`${unit.unitWeight} points`}
                />
                {isCompleted && (
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <CheckCircle size={16} />
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

UnitSidebar.displayName = 'UnitSidebar'
export default memo(UnitSidebar)
