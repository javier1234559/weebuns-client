import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { AppError } from '~/components/common/AppError'
import { AppLoading } from '~/components/common/AppLoading'
import PaginationUrl from '~/components/feature/PaginationUrl'
import { CardTitle } from '~/components/ui/card'
import { useModal } from '~/contexts/ModalContext'
import UnitLessonBuilder, { DragEndEvent } from '~/features/admin/course/components/CourseBuilder/UnitLessonBuilder'
import UnitModal from '~/features/admin/course/modal/UnitModal'
import { useGetCourseUnits } from '~/features/course/hooks/useCourseQueries'
import { useBulkUpdateLesson } from '~/features/unit/hooks/useUnitQueries'
import usePagination from '~/hooks/usePagination'
import { RouteNames } from '~/router/route-name'
import { LessonWithoutContent, UnitWithLessonsDto } from '~/services/api/api-axios'
import { replacePathId } from '~/utils/replace-path'

interface UnitBuilderViewProps {
  courseId: string
}

export const UnitBuilderView = ({ courseId }: UnitBuilderViewProps) => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { page, perPage, updateQueryParams } = usePagination({ defaultPage: 1, defaultPerPage: 5 })
  const [localUnits, setLocalUnits] = useState<UnitWithLessonsDto[]>([])
  const previousStateRef = useRef<UnitWithLessonsDto[]>([])

  const { data, isLoading, error } = useGetCourseUnits(courseId, { page, perPage })
  const bulkUpdateUnit = useBulkUpdateLesson()

  useEffect(() => {
    if (data?.data) {
      setLocalUnits(data.data)
      // Update previous state with server data
      previousStateRef.current = data.data
    }
  }, [data])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { type, source, destination, item } = event
    if (!destination) return

    // Store current state for potential rollback
    const previousState = [...localUnits]

    // Update local state immediately
    const newUnits = [...localUnits]

    if (type === 'unit') {
      const [removed] = newUnits.splice(source.index, 1)
      newUnits.splice(destination.index, 0, removed)
      newUnits.forEach((unit, index) => {
        unit.orderIndex = index
      })
    } else {
      const sourceUnit = newUnits.find((u) => u.id === source.unitId)
      const destUnit = newUnits.find((u) => u.id === destination.unitId)

      if (!sourceUnit?.lessons || !destUnit?.lessons) return

      sourceUnit.lessons.splice(source.index, 1)
      const movedLesson = { ...(item as LessonWithoutContent) }
      movedLesson.unitId = destination.unitId || movedLesson.unitId
      destUnit.lessons.splice(destination.index, 0, movedLesson)

      sourceUnit.lessons.forEach((lesson, index) => {
        lesson.orderIndex = index
      })
      destUnit.lessons.forEach((lesson, index) => {
        lesson.orderIndex = index
      })
    }

    // Update local state first
    setLocalUnits(newUnits)

    try {
      // Send update to server
      await bulkUpdateUnit.mutateAsync({
        data: {
          courseId,
          units: newUnits
        }
      })
      // Update previous state after successful update
      previousStateRef.current = newUnits
    } catch (error) {
      // On error, revert to previous state
      setLocalUnits(previousState)
      // Show error notification
      toast.error('Failed to update order. Changes have been reverted.')
      console.error('Failed to update order:', error)
    }
  }

  const handleAddUnit = () => {
    const nextOrderIndex = localUnits.length
    openModal(UnitModal, {
      courseId,
      nextOrderIndex,
      onSuccess: (newUnit: UnitWithLessonsDto) => {
        setLocalUnits((prev) => [...prev, newUnit])
      }
    })
  }

  const handleEditUnit = (unitId: string) => {
    openModal(UnitModal, {
      unitId,
      courseId,
      onSuccess: (updatedUnit: UnitWithLessonsDto) => {
        // Replace the existing unit instead of adding a new one
        setLocalUnits((prev) => prev.map((unit) => (unit.id === updatedUnit.id ? updatedUnit : unit)))
      },
      onDelete: (unitId: string) => {
        setLocalUnits((prev) => prev.filter((u) => u.id !== unitId))
      }
    })
  }

  const handleAddLesson = (unitId: string) => {
    const nextOrderIndex = localUnits.find((u) => u.id === unitId)?.lessons?.length || 0
    const url = replacePathId(RouteNames.AdminLessonDetail, unitId)

    // Create new URLSearchParams
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('nextOrderIndex', String(nextOrderIndex))
    newSearchParams.set('courseId', courseId)

    navigate(url + '?' + newSearchParams.toString(), {
      state: {
        returnPath: window.location.pathname
      }
    })
  }

  const handleEditLesson = (lessonId: string, unitId: string) => {
    const url = replacePathId(RouteNames.AdminLessonDetail, unitId)

    // Create new URLSearchParams
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('lessonId', lessonId)
    newSearchParams.set('courseId', courseId)

    navigate(url + '?' + newSearchParams.toString(), {
      state: {
        returnPath: window.location.pathname
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  if (isLoading) {
    return <AppLoading />
  }

  if (error) {
    return <AppError error={error} />
  }

  if (!data) {
    return null
  }

  return (
    <Card>
      <CardContent>
        <CardTitle>Unit Builder</CardTitle>
        <UnitLessonBuilder
          units={localUnits}
          onDragEnd={handleDragEnd}
          onAddUnit={handleAddUnit}
          onAddLesson={handleAddLesson}
          onEditLesson={handleEditLesson}
          onEditUnit={handleEditUnit}
        />
        <Box mt={4}>
          <PaginationUrl
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
            variant='outlined'
            color='primary'
            size='large'
          />
        </Box>
      </CardContent>
    </Card>
  )
}
