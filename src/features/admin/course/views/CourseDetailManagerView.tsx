import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import CourseForm, { CourseFormData } from '~/features/admin/course/components/CourseBuilder/CourseForm'
import { useGetCourseById, useUpdateCourse } from '~/features/course/hooks/useCourseQueries'
import { RouteNames } from '~/router/route-name'
import { getErrorMessage } from '~/utils/error'

function CourseDetailManagerView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading, error, isError } = useGetCourseById(id || '')

  const updateMutation = useUpdateCourse()

  const handleUpdateCourse = useCallback(
    async (formData: CourseFormData) => {
      const loadingId = toast.loading('Updating course...')

      try {
        const updateData = {
          title: formData.title,
          description: formData.description,
          thumbnailUrl: formData.thumbnailUrl,
          language: formData.language,
          minLevel: formData.minLevel,
          maxLevel: formData.maxLevel,
          topics: formData.topics.filter((topic) => topic !== undefined),
          courseType: formData.courseType,
          isPremium: formData.isPremium,
          isPublished: formData.isPublished,
          totalWeight: formData.totalWeight
        }

        if (!id) {
          toast.error('Course ID is required')
          return
        }

        console.log(JSON.stringify(updateData, null, 2))

        await updateMutation.mutateAsync({
          id,
          data: updateData
        })

        toast.success('Course updated successfully', { id: loadingId })
        setTimeout(() => {
          navigate(RouteNames.AdminCourseManager)
        }, 1000)
      } catch (error) {
        toast.error(getErrorMessage(error), { id: loadingId })
      }
    },
    [id, navigate, updateMutation]
  )

  if (isLoading) {
    return <AppLoading />
  }

  if (isError) {
    return (
      <AppError
        error={error}
        notFoundConfig={{
          title: 'Course Not Found',
          message: "The course you're looking for doesn't exist or has been removed.",
          backUrl: RouteNames.AdminCourseManager,
          backText: 'Back to Courses'
        }}
      />
    )
  }

  return (
    <CourseForm
      initialData={data?.course as CourseFormData}
      onSubmit={handleUpdateCourse}
      isLoading={updateMutation.isPending}
    />
  )
}

CourseDetailManagerView.displayName = 'CourseDetailManagerView'
export default CourseDetailManagerView
