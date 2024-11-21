import Box from '@mui/material/Box'
import { ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { AppButton } from '~/components/common/AppButton'
import { setCourseProgress } from '~/features/course/courseSlice'
import { useUpdateCourseProgress } from '~/features/course/hooks/useCourseQueries'
import { Unit, UnitContent } from '~/services/api/api-axios'
import { RootState } from '~/store/store'
import logOnDev from '~/utils/log-on-dev'

interface CompleteProgressButtonProps {
  content: UnitContent
  nextContent?: UnitContent | null
  isLastContent?: boolean
  nextUnit?: Unit | null
}

function CompleteProgressButton({ content, nextContent, isLastContent, nextUnit }: CompleteProgressButtonProps) {
  const { id: courseId } = useParams()
  const [, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const currentProgress = useSelector((state: RootState) => state.course.currentCourseProgress)
  const navigation = useSelector((state: RootState) => state.course.navigation)
  const { mutate: updateProgress } = useUpdateCourseProgress()

  const isCompleted = currentProgress?.completedContents?.includes(content.id)

  const handleNext = () => {
    if (isLastContent && nextUnit) {
      // If last content in unit, go to first content of next unit
      setSearchParams((prev) => {
        prev.set('unitId', nextUnit.id)
        if (nextUnit.contents) {
          prev.set('unitContentId', nextUnit.contents[0].id)
        }
        return prev
      })
    } else if (nextContent) {
      // Go to next content in same unit
      setSearchParams((prev) => {
        prev.set('unitContentId', nextContent.id)
        return prev
      })
    }
  }

  const handleCompleteProgress = () => {
    if (!courseId || !navigation.currentUnit) return

    const newCompletedContents = isCompleted
      ? currentProgress.completedContents.filter((id) => id !== content.id)
      : [...currentProgress.completedContents, content.id]

    let newCompletedUnits = [...currentProgress.completedUnits]

    if (isLastContent && !isCompleted) {
      // Check if all contents in current unit are completed
      const currentUnitContents = navigation.currentUnit.contents || []
      const allContentsCompleted = currentUnitContents.every(
        (c) => c.id === content.id || newCompletedContents.includes(c.id)
      )

      if (allContentsCompleted && !newCompletedUnits.includes(navigation.currentUnit.id)) {
        newCompletedUnits.push(navigation.currentUnit.id)
      }
    } else if (isLastContent && isCompleted) {
      newCompletedUnits = newCompletedUnits.filter((id) => id !== navigation?.currentUnit?.id)
    }

    const newWeight = isCompleted
      ? currentProgress.completedWeight - content.contentWeight
      : currentProgress.completedWeight + content.contentWeight

    logOnDev('CompleteProgressButton', {
      newCompletedUnits,
      newCompletedContents,
      currentUnit: navigation.currentUnit,
      isLastContent,
      isCompleted
    })

    updateProgress(
      {
        courseId,
        data: {
          ...currentProgress,
          completedContents: newCompletedContents,
          completedUnits: newCompletedUnits,
          completedWeight: newWeight,
          currentUnitId: content.unitId,
          currentUnitContentId: content.id,
          nextUnitId: isLastContent ? nextUnit?.id : content.unitId,
          nextUnitContentId: nextContent?.id
        }
      },
      {
        onSuccess: (data: any) => {
          dispatch(setCourseProgress(data.courseProgress))
        }
      }
    )
  }

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <AppButton
        onClick={handleCompleteProgress}
        variant={isCompleted ? 'outlined' : 'contained'}
        startIcon={isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
      >
        {isCompleted ? 'Completed' : 'Mark as Complete'}
      </AppButton>

      {isCompleted && (nextContent || (isLastContent && nextUnit)) && (
        <AppButton onClick={handleNext} variant='contained' endIcon={<ArrowRight size={20} />}>
          Next Lesson
        </AppButton>
      )}
    </Box>
  )
}

CompleteProgressButton.displayName = 'CompleteProgressButton'
export default memo(CompleteProgressButton)
