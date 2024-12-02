import Grid from '@mui/material/Grid'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import { ModalProvider } from '~/contexts/ModalContext'
import CourseForm, { CourseFormData } from '~/features/admin/course/components/CourseBuilder/CourseForm'
import { UnitBuilderView } from '~/features/admin/course/components/CourseBuilder/UnitBuilderView'
import { useGetCourseById, useUpdateCourse } from '~/features/course/hooks/useCourseQueries'
import { RouteNames } from '~/router/route-name'

function CourseDetailManagerView() {
  const { id } = useParams<{ id: string }>()
  const courseId = id || ''

  const { data, isLoading, error, isError } = useGetCourseById(courseId)

  const updateMutation = useUpdateCourse()

  const handleUpdateCourse = useCallback(
    async (formData: CourseFormData) => {
      const loadingId = toast.loading('Updating course...')

      const updateData = {
        title: formData.title,
        description: formData.description,
        thumbnailUrl: formData.thumbnailUrl,
        language: formData.language,
        minLevel: formData.minLevel,
        maxLevel: formData.maxLevel,
        topics: formData.topics.filter((topic) => topic !== undefined),
        courseType: formData.courseType,
        totalWeight: formData.totalWeight,
        status: formData.status,
        isPremium: formData.isPremium
      }

      if (!id) {
        toast.error('Course ID is required')
        return
      }

      await updateMutation.mutateAsync({
        id,
        data: updateData
      })

      toast.success('Course updated successfully', { id: loadingId })
    },
    [id, updateMutation]
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
    <ModalProvider>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CourseForm
            initialData={data?.course as CourseFormData}
            onSubmit={handleUpdateCourse}
            isLoading={updateMutation.isPending}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UnitBuilderView courseId={courseId} />
        </Grid>
      </Grid>
    </ModalProvider>
  )
}

CourseDetailManagerView.displayName = 'CourseDetailManagerView'
export default CourseDetailManagerView
