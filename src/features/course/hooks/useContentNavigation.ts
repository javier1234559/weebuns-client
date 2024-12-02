import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { setNavigation } from '~/features/course/courseSlice'
import { useCourseLearn } from '~/features/course/hooks/useCourseQueries'
import { RootState } from '~/store/store'
import logOnDev from '~/utils/log-on-dev'

export const useContentNavigation = () => {
  const { id: courseId } = useParams<{ id: string }>()

  const [searchParams] = useSearchParams()
  const unitId = searchParams.get('unitId')
  const lessonId = searchParams.get('lessonId')

  const dispatch = useDispatch()
  const { data: courseData } = useCourseLearn(courseId || '')

  const { navigation } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    if (!courseData) return

    const { course } = courseData
    const units = course.units || []
    const currentUnitIndex = units.findIndex((u) => u.id === unitId)
    const currentUnit = units[currentUnitIndex]

    if (!currentUnit) return

    const lessons = currentUnit.lessons || []
    const lessonIndex = lessons.findIndex((l) => l.id === lessonId)
    const currentLesson = lessons[lessonIndex]
    const nextLesson = lessons[lessonIndex + 1]
    const nextUnit = units[currentUnitIndex + 1]
    const isLastLesson = lessonIndex === lessons.length - 1

    logOnDev(
      'CURRENT_PROGRESS',
      JSON.stringify({ currentUnit, currentLesson, nextUnit, nextLesson, isLastLesson }, null, 2)
    )

    dispatch(
      setNavigation({
        currentUnit,
        currentLesson,
        nextUnit: isLastLesson ? nextUnit : null,
        nextLesson: !isLastLesson ? nextLesson : null,
        isLastLesson
      })
    )
  }, [courseData, unitId, lessonId, dispatch])

  return navigation
}
