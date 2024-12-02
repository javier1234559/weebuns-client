import { useParams, useSearchParams } from 'react-router-dom'

interface CourseLearnParams {
  courseId: string
  unitId: string | null
  lessonId: string | null
}

const useLearnParams = (): CourseLearnParams => {
  const [searchParams] = useSearchParams()
  const { id } = useParams<{ id: string }>()

  return {
    courseId: id ?? '',
    unitId: searchParams.get('unitId'),
    lessonId: searchParams.get('lessonId')
  }
}

export default useLearnParams
