import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setCourseProgress } from '~/features/course/courseSlice'
import { useGetCourseProgress } from '~/features/course/hooks/useCourseQueries'

interface CourseProgress {
  courseId: string
}

export const useSetupCourseProgress = ({ courseId }: CourseProgress) => {
  const dispatch = useDispatch()
  const { data: courseProgress, error } = useGetCourseProgress(courseId)

  useEffect(() => {
    if (courseProgress) {
      dispatch(setCourseProgress(courseProgress.courseProgress))
    }
  }, [courseProgress, dispatch, courseId])

  return { courseProgress, error }
}
