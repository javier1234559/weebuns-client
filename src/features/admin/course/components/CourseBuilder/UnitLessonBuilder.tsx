import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import AddIcon from '@mui/icons-material/Add'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ChevronDown } from 'lucide-react'
import { memo, useCallback } from 'react'

import AppButton from '~/components/common/AppButton'
import { LessonWithoutContent, UnitWithLessonsDto } from '~/services/api/api-axios'
import { textUtils } from '~/utils/text-utils'

export interface DragEndEvent {
  type: 'unit' | 'lesson'
  source: {
    unitId?: string
    index: number
  }
  destination: {
    unitId?: string
    index: number
  }
  item: UnitWithLessonsDto | LessonWithoutContent
}

interface UnitLessonBuilderProps {
  units: UnitWithLessonsDto[]
  onDragEnd: (event: DragEndEvent) => void
  onAddUnit: () => void
  onAddLesson: (unitId: string) => void
  onEditLesson: (lessonId: string, unitId: string) => void
  onEditUnit: (unitId: string) => void
}

const getUnitIdFromDroppableId = (droppableId: string) => droppableId.replace('-lessons', '')

const UnitLessonBuilder = ({
  units,
  onDragEnd,
  onAddUnit,
  onAddLesson,
  onEditLesson,
  onEditUnit
}: UnitLessonBuilderProps) => {
  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      console.log('DragEndEvent:', result)
      const { source, destination, type } = result

      if (source.droppableId === destination.droppableId && source.index === destination.index) return

      if (type === 'unit') {
        onDragEnd({
          type: 'unit',
          source: { index: source.index },
          destination: { index: destination.index },
          item: units[source.index]
        })
        return
      }

      if (type === 'lesson') {
        // Get clean unit IDs
        const sourceUnitId = getUnitIdFromDroppableId(source.droppableId)
        const destUnitId = getUnitIdFromDroppableId(destination.droppableId)

        const sourceUnit = units.find((u) => u.id === sourceUnitId)
        const lesson = sourceUnit?.lessons?.[source.index]

        onDragEnd({
          type: 'lesson',
          source: {
            unitId: sourceUnitId,
            index: source.index
          },
          destination: {
            unitId: destUnitId,
            index: destination.index
          },
          item: {
            ...lesson,
            unitId: destUnitId
          } as LessonWithoutContent
        })
      }
    },
    [onDragEnd, units]
  )

  return (
    <Box sx={{ p: 2 }}>
      <AppButton variant='black' startIcon={<AddIcon />} onClick={onAddUnit} sx={{ mb: 2 }}>
        Add Unit
      </AppButton>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='units' type='unit'>
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {units.map((unit, unitIndex) => (
                <Draggable key={unit.id} draggableId={unit.id} index={unitIndex}>
                  {(provided, snapshot) => (
                    <Accordion
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        mb: 2,
                        '&:before': { display: 'none' },
                        boxShadow: snapshot.isDragging ? 4 : 1
                      }}
                      defaultExpanded
                    >
                      <AccordionSummary
                        expandIcon={<ChevronDown size={20} />}
                        {...provided.dragHandleProps}
                        sx={{
                          '& .MuiAccordionSummary-content': {
                            display: 'flex',
                            alignItems: 'center'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 2, width: '100%' }}>
                          <DragIndicatorIcon sx={{ color: 'grey.500' }} />
                          <Typography variant='h6'>{unit.title}</Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 'auto' }}>
                            {unit.isPremium && <Chip label='Premium' size='small' color='warning' />}
                          </Box>
                          <IconButton
                            size='small'
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditUnit(unit.id)
                            }}
                            sx={{
                              ml: 1,
                              '&:hover': {
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            <DriveFileRenameOutlineIcon fontSize='small' />
                          </IconButton>
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Box sx={{ mb: 2 }}>
                          <AppButton
                            variant='outlined'
                            startIcon={<AddIcon />}
                            size='small'
                            onClick={() => onAddLesson(unit.id)}
                            fullWidth
                            sx={{
                              bgcolor: 'background.paper',
                              borderStyle: 'dashed',
                              '&:hover': {
                                borderStyle: 'dashed',
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            Add Lesson
                          </AppButton>
                        </Box>

                        <Droppable droppableId={`${unit.id}-lessons`} type='lesson'>
                          {(provided) => (
                            <Box
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              sx={{ '& > *:not(:last-child)': { mb: 1 } }}
                            >
                              {unit.lessons &&
                                unit.lessons.map((lesson, lessonIndex) => (
                                  <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                    {(provided, snapshot) => (
                                      <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        elevation={snapshot.isDragging ? 3 : 1}
                                        sx={{
                                          p: 2,
                                          transition: 'all 0.2s',
                                          transform: snapshot.isDragging ? 'scale(1.02)' : 'none',
                                          '&:hover': {
                                            boxShadow: 2
                                          }
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                          }}
                                        >
                                          <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <DragIndicatorIcon sx={{ mr: 1, color: 'grey.500' }} />
                                              <Typography variant='subtitle1'>{lesson.title}</Typography>
                                            </Box>
                                            {lesson.summary && (
                                              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                                                {textUtils.truncate(textUtils.sanitize(lesson.summary), 200)}
                                              </Typography>
                                            )}
                                          </Box>
                                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            {lesson.isPremium && <Chip label='Premium' size='small' color='warning' />}
                                            <Chip label={`Weight: ${lesson.lessonWeight}`} size='small' color='info' />
                                            <IconButton
                                              size='small'
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                onEditLesson(lesson.id, unit.id)
                                              }}
                                              sx={{
                                                ml: 1,
                                                '&:hover': {
                                                  bgcolor: 'action.hover'
                                                }
                                              }}
                                            >
                                              <DriveFileRenameOutlineIcon fontSize='small' />
                                            </IconButton>
                                          </Box>
                                        </Box>
                                      </Paper>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </Box>
                          )}
                        </Droppable>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default memo(UnitLessonBuilder)
