import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import LessonForm, { LessonFormData } from '~/features/admin/course/components/CourseBuilder/LessonForm'
import { useGetLessonById } from '~/features/admin/lesson/hooks/useLessonQueries'
import { LessonContent } from '~/features/lesson/lesson.type'
import { useCreateLesson, useDeleteLesson, useUpdateLesson } from '~/features/unit/hooks/useUnitQueries'
import { RouteNames } from '~/router/route-name'
import { ContentStatus, Lesson } from '~/services/api/api-axios'
import { replacePathId } from '~/utils/replace-path'

function LessonDetailView() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const unitId = id
  const lessonId = searchParams.get('lessonId')
  const courseId = searchParams.get('courseId')
  const nextOrderIndex = Number(searchParams.get('nextOrderIndex')) || 0
  const returnPath = location.state?.returnPath

  const isEditMode = Boolean(lessonId)

  const {
    data: lessonData,
    isLoading: isLoadingLesson,
    error
  } = useGetLessonById(lessonId || '', {
    enabled: isEditMode
  })

  const createLesson = useCreateLesson()
  const updateLesson = useUpdateLesson()
  const deleteLesson = useDeleteLesson()

  const isSubmitting = createLesson.isPending || updateLesson.isPending

  const handleSubmit = async (formData: LessonFormData) => {
    console.log(formData)
    try {
      if (isEditMode) {
        await updateLesson.mutateAsync({
          lessonId: lessonId!,
          data: {
            ...formData,
            content: formData.content,
            summary: formData.summary ?? null
          },
          unitId: unitId!
        })
        toast.success('Lesson updated successfully')
      } else {
        await createLesson.mutateAsync({
          data: {
            ...formData,
            content: formData.content,
            orderIndex: nextOrderIndex,
            summary: formData.summary ?? null
          },
          unitId: unitId!
        })
        toast.success('Lesson created successfully')
      }
      handleBackToCourseBuilder()
    } catch (error) {
      console.error('Failed to save lesson:', error)
      toast.error('Failed to save lesson')
    }
  }

  const handleDelete = async () => {
    if (!lessonId || !window.confirm('Are you sure you want to delete this lesson?')) return

    try {
      await deleteLesson.mutateAsync({
        unitId: unitId!,
        lessonId
      })
      toast.success('Lesson deleted successfully')
      handleBackToCourseBuilder()
    } catch (error) {
      console.error('Failed to delete lesson:', error)
      toast.error('Failed to delete lesson')
    }
  }

  const handleBackToCourseBuilder = () => {
    if (!courseId) {
      console.error('courseId is null')
      return
    }

    navigate(returnPath || `${replacePathId(RouteNames.AdminCourseManagerDetail, courseId)}`, {
      replace: true
    })
  }

  if (isEditMode && isLoadingLesson) return <AppLoading />
  if (error) return <AppError error={error} />

  return (
    <Box py={3}>
      <Typography variant='h6' component='h2' gutterBottom>
        {isEditMode ? 'Edit Lesson' : 'Create Lesson'}
      </Typography>
      <LessonForm
        isLoading={isSubmitting}
        initialData={isEditMode ? mapLessonToFormData(lessonData?.lesson) : undefined}
        onSubmit={handleSubmit}
        onCancel={handleBackToCourseBuilder}
        onDelete={isEditMode ? handleDelete : undefined}
      />
    </Box>
  )
}

function mapLessonToFormData(lesson?: Lesson): Partial<LessonFormData> | undefined {
  if (!lesson) return undefined
  return {
    summary: lesson.summary,
    status: lesson.status as ContentStatus,
    title: lesson.title,
    isPremium: lesson.isPremium,
    isRequired: lesson.isRequired,
    lessonWeight: lesson.lessonWeight,
    content: lesson.content as LessonContent
  }
}

LessonDetailView.displayName = 'LessonDetailView'
export default LessonDetailView
