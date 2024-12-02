import Box from '@mui/material/Box'
import { ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { AppButton } from '~/components/common/AppButton'
import { setCourseProgress } from '~/features/course/courseSlice'
import { useUpdateCourseProgress } from '~/features/course/hooks/useCourseQueries'
import { Lesson, Unit } from '~/services/api/api-axios'
import { RootState } from '~/store/store'
import logOnDev from '~/utils/log-on-dev'

interface CompleteProgressButtonProps {
  lesson: Lesson
  nextLesson?: Lesson | null
  isLastLesson?: boolean
  nextUnit?: Unit | null
}

function CompleteProgressButton({ lesson, nextLesson, isLastLesson, nextUnit }: CompleteProgressButtonProps) {
  const { id: courseId } = useParams()
  const [, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const currentProgress = useSelector((state: RootState) => state.course.currentCourseProgress)
  const navigation = useSelector((state: RootState) => state.course.navigation)
  const { mutate: updateProgress } = useUpdateCourseProgress()

  const isCompleted = currentProgress?.completedLessons?.includes(lesson.id)

  const handleNext = () => {
    if (isLastLesson && nextUnit) {
      // If last lesson in unit, go to first lesson of next unit
      setSearchParams((prev) => {
        prev.set('unitId', nextUnit.id)
        if (nextUnit.lessons) {
          prev.set('lessonId', nextUnit.lessons[0].id)
        }
        return prev
      })
    } else if (nextLesson) {
      // Go to next lesson in same unit
      setSearchParams((prev) => {
        prev.set('lessonId', nextLesson.id)
        return prev
      })
    }
  }

  const handleCompleteProgress = () => {
    if (!courseId || !navigation.currentUnit) return

    const newCompletedContents = isCompleted
      ? currentProgress.completedLessons.filter((id) => id !== lesson.id)
      : [...currentProgress.completedLessons, lesson.id]

    let newCompletedUnits = [...currentProgress.completedUnits]

    if (isLastLesson && !isCompleted) {
      // Check if all lessons in current unit are completed
      const currentLessons = navigation.currentUnit.lessons || []
      const allContentsCompleted = currentLessons.every(
        (c) => c.id === lesson.id || newCompletedContents.includes(c.id)
      )

      if (allContentsCompleted && !newCompletedUnits.includes(navigation.currentUnit.id)) {
        newCompletedUnits.push(navigation.currentUnit.id)
      }
    } else if (isLastLesson && isCompleted) {
      newCompletedUnits = newCompletedUnits.filter((id) => id !== navigation?.currentUnit?.id)
    }

    const newWeight = isCompleted
      ? currentProgress.completedWeight - lesson.lessonWeight
      : currentProgress.completedWeight + lesson.lessonWeight

    logOnDev('CompleteProgressButton', {
      newCompletedUnits,
      newCompletedContents,
      currentUnit: navigation.currentUnit,
      isLastLesson,
      isCompleted
    })

    updateProgress(
      {
        courseId,
        data: {
          ...currentProgress,
          completedLessons: newCompletedContents,
          completedUnits: newCompletedUnits,
          completedWeight: newWeight,
          currentUnitId: lesson.unitId,
          currentLessonId: lesson.id,
          nextUnitId: isLastLesson ? nextUnit?.id : lesson.unitId,
          nextLessonId: nextLesson?.id
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

      {isCompleted && (nextLesson || (isLastLesson && nextUnit)) && (
        <AppButton onClick={handleNext} variant='contained' endIcon={<ArrowRight size={20} />}>
          Next Lesson
        </AppButton>
      )}
    </Box>
  )
}

CompleteProgressButton.displayName = 'CompleteProgressButton'
export default memo(CompleteProgressButton)
