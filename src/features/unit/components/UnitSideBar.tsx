import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import { CheckCircle, ChevronDown, Lock } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import useLearnParams from '~/features/unit/hooks/useLearnParams'
import { UnitLearnDto } from '~/services/api/api-axios'
import { RootState } from '~/store/store'

const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== 'isCompleted' && prop !== 'isCurrentUnit'
})<{ isCompleted?: boolean; isCurrentUnit?: boolean }>(({ theme, isCompleted }) => ({
  borderRadius: 0,
  backgroundColor: isCompleted ? theme.palette.success.light : undefined,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground
  }
}))

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isCompleted' && prop !== 'isCurrentLesson'
})<{ isCompleted?: boolean; isCurrentLesson?: boolean }>(({ theme, isCompleted }) => ({
  backgroundColor: isCompleted ? theme.palette.success.light : undefined
}))

interface UnitSidebarProps {
  units: UnitLearnDto[]
}

const UnitSidebar = ({ units }: UnitSidebarProps) => {
  const [, setSearchParams] = useSearchParams()
  const { unitId, lessonId } = useLearnParams()

  const [expandedUnit, setExpandedUnit] = useState<string | null>(unitId)

  const courseState = useSelector((state: RootState) => state.course)

  console.log('currentLessonId', lessonId)

  // const completedUnits = courseState.currentCourseProgress?.completedUnits ?? []
  const completedLessons = courseState.currentCourseProgress?.completedLessons ?? []

  // TODO: Get this from user state/context
  const isUserPremium = false

  const handleLessonClick = (unitId: string, lessonId: string) => {
    setSearchParams((prev) => {
      prev.set('unitId', unitId)
      prev.set('lessonId', lessonId)
      return prev
    })
  }

  const handleAccordionChange = (unitId: string) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId)
  }

  const isUnitCompleted = (unit: UnitLearnDto) => {
    return unit.lessons.every((lesson) => completedLessons.includes(lesson.id))
  }

  return (
    <Box sx={{ width: '100%' }}>
      {units.map((unit) => {
        const isCompleted = isUnitCompleted(unit)
        const isCurrentUnit = unit.id === unitId
        const isUnitPremium = unit.isPremium
        const showLock = isUnitPremium && !isUserPremium && !isCompleted
        const isDisabled = isUnitPremium && !isUserPremium && !isCompleted

        return (
          <StyledAccordion
            key={unit.id}
            expanded={expandedUnit === unit.id}
            onChange={() => !isDisabled && handleAccordionChange(unit.id)}
            isCompleted={isCompleted}
            isCurrentUnit={isCurrentUnit}
            disabled={isDisabled}
          >
            <AccordionSummary expandIcon={<ChevronDown size={20} />} sx={{ minHeight: 48 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 2
                }}
              >
                <ListItemText
                  primary={unit.title}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isCurrentUnit ? 600 : 400
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {showLock && <Lock size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />}
                  {isCompleted && <CheckCircle size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />}
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <List sx={{ py: 0 }}>
                {unit.lessons.map((lesson) => {
                  const isLessonCompleted = completedLessons.includes(lesson.id)
                  const isCurrentLesson = lesson.id === lessonId
                  const isLessonPremium = lesson.isPremium
                  const showLessonLock = isLessonPremium && !isUserPremium && !isLessonCompleted
                  const isLessonDisabled = isLessonPremium && !isUserPremium && !isLessonCompleted

                  return (
                    <StyledListItem
                      key={lesson.id}
                      disablePadding
                      isCompleted={isLessonCompleted}
                      isCurrentLesson={isCurrentLesson}
                    >
                      <ListItemButton
                        disabled={isLessonDisabled}
                        onClick={() => handleLessonClick(unit.id, lesson.id)}
                        sx={(theme) => ({
                          pl: 3,
                          boxShadow: isCurrentLesson ? `inset -3px 0 0 ${theme.palette.primary.main}` : 'none',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            borderRadius: 0,
                            boxShadow: `inset -3px 0 0 ${theme.palette.primary.main}`,
                            transition: 'all ease-in-out 0.3s'
                          }
                        })}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: 2
                          }}
                        >
                          <ListItemText
                            primary={lesson.title}
                            sx={{
                              borderRadius: 0,
                              '& .MuiTypography-root': {
                                fontWeight: isCurrentLesson ? 600 : 400
                              }
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {showLessonLock && (
                              <Lock size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
                            )}
                            {isLessonCompleted && (
                              <CheckCircle size={16} style={{ color: 'var(--mui-palette-text-secondary)' }} />
                            )}
                          </Box>
                        </Box>
                      </ListItemButton>
                    </StyledListItem>
                  )
                })}
              </List>
            </AccordionDetails>
          </StyledAccordion>
        )
      })}
    </Box>
  )
}

export default UnitSidebar
