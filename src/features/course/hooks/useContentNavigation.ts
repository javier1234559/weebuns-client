import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

import { setNavigation } from '~/features/course/courseSlice'
import { useCourseLearn } from '~/features/course/hooks/useCourseQueries'
import { useLearnUnit } from '~/features/unit/hooks/useUnitQueries'
import { RootState } from '~/store/store'
import logOnDev from '~/utils/log-on-dev'

export const useContentNavigation = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { id: courseId } = useParams<{ id: string }>()
  const unitId = searchParams.get('unitId')
  const contentId = searchParams.get('unitContentId')
  const { navigation } = useSelector((state: RootState) => state.course)

  const { data: courseData } = useCourseLearn(courseId || '')
  const { data: unitData } = useLearnUnit(unitId || '')

  useEffect(() => {
    if (!courseData || !unitData) return

    const { course } = courseData
    const units = course.units || []
    const currentUnitIndex = units.findIndex((u) => u.id === unitId)
    const currentUnit = units[currentUnitIndex]

    if (!currentUnit || !unitData.unit.contents) return

    const contentIndex = unitData.unit.contents.findIndex((c) => c.id === contentId)
    const currentContent = unitData.unit.contents[contentIndex]
    const nextContent = unitData.unit.contents[contentIndex + 1]
    const nextUnit = units[currentUnitIndex + 1]
    const isLastContent = contentIndex === unitData.unit.contents.length - 1

    logOnDev(
      'CURRENT_PROGRESS',
      JSON.stringify({ currentUnit, currentContent, nextUnit, nextContent, isLastContent }, null, 2)
    )
    dispatch(
      setNavigation({
        currentUnit,
        currentContent,
        nextUnit: isLastContent ? nextUnit : null,
        nextContent: !isLastContent ? nextContent : null,
        isLastContent
      })
    )
  }, [courseData, unitData, unitId, contentId, dispatch])

  return navigation
}
