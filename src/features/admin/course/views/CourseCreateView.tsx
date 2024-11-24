import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import CourseForm, { CourseFormData } from '~/features/admin/course/components/CourseBuilder/CourseForm'
import { useCreateCourse } from '~/features/course/hooks/useCourseQueries'
import { RouteNames } from '~/router/route-name'

function CourseCreateView() {
  const navigate = useNavigate()
  const mutation = useCreateCourse()

  const handleCourse = async (data: CourseFormData) => {
    const loadingId = toast.loading('Creating course...')

    const result = await mutation.mutateAsync({
      ...data,
      topics: data.topics.filter((topic) => topic !== undefined)
    })

    if (result.course) {
      toast.success('Course created successfully', { id: loadingId })
      setTimeout(() => {
        navigate(RouteNames.AdminCourseManager)
      }, 1000)
    }
  }

  return <CourseForm onSubmit={handleCourse} isLoading={mutation.isPending} />
}

CourseCreateView.displayName = 'CourseCreateView'
export default CourseCreateView
