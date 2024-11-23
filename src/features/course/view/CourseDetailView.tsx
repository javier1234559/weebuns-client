import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import CourseIntroduction from '~/features/course/components/CourseIntroduction'
import { useContentNavigation } from '~/features/course/hooks/useContentNavigation'
import { useCourseLearn } from '~/features/course/hooks/useCourseQueries'
import { useSetupCourseProgress } from '~/features/course/hooks/useSetupCourseProgress'

const CourseContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '24px',
  marginTop: '24px',
  width: '100%',
  flex: 1,
  maxWidth: 'calc(100% - 48px)'
}))

const CourseDetailView = () => {
  useContentNavigation()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useCourseLearn(id || '')
  useSetupCourseProgress({ courseId: id || '' })

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError message={error?.message || 'No data found'} />

  return (
    <CourseContainer>
      <CourseIntroduction data={data.course} />
    </CourseContainer>
  )
}

CourseDetailView.displayName = 'CourseDetailView'
export default CourseDetailView
