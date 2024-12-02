import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import MinimalEditor from '~/components/feature/Editor/MinimalEditor'
import LessonContentBuilder from '~/features/admin/lesson/components/LessonContenBuilder'
import { LessonContent } from '~/features/lesson/lesson.type'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { ContentStatus } from '~/services/api/api-axios'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  summary: yup.string().nullable(),
  content: yup
    .object()
    .shape({
      blocks: yup.array().min(1, 'Content must have at least one block').required(),
      metadata: yup.object().shape({
        lastUpdated: yup.string(),
        updatedById: yup.string()
      })
    })
    .required('Content is required'),
  isPremium: yup.boolean().default(false),
  isRequired: yup.boolean().default(true),
  lessonWeight: yup.number().min(0).default(0),
  status: yup.mixed<ContentStatus>().oneOf(Object.values(ContentStatus)).default(ContentStatus.Draft)
})

export type LessonFormData = yup.InferType<typeof schema>

interface LessonFormProps {
  onSubmit: (data: LessonFormData) => Promise<void>
  onDelete?: () => void
  onCancel(): void
  isLoading?: boolean
  initialData?: Partial<LessonFormData>
}

const LessonForm = ({ onSubmit, onDelete, isLoading, initialData, onCancel }: LessonFormProps) => {
  const { isDarkMode } = useEventSwitchDarkMode()
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<LessonFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      summary: '',
      content: {
        blocks: [],
        metadata: {
          lastUpdated: new Date().toISOString(),
          updatedById: 'defaultUserId'
        }
      },
      isPremium: false,
      isRequired: true,
      lessonWeight: 0,
      status: ContentStatus.Draft,
      ...initialData
    }
  })

  const handleFormSubmit = async (data: LessonFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Title
        </Typography>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <AppInput
              {...field}
              fullWidth
              error={!!errors.title}
              placeholder='Enter lesson title'
              helperText={errors.title?.message}
            />
          )}
        />
      </Box>

      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Summary
        </Typography>
        <Controller
          name='summary'
          control={control}
          render={({ field }) => (
            <Box>
              <MinimalEditor isDark={isDarkMode} content={field.value || ''} onChangeContent={field.onChange} />
              {errors.summary && (
                <Typography color='error' variant='caption' sx={{ mt: 1 }}>
                  {errors.summary.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>

      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Content
        </Typography>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <Box>
              <LessonContentBuilder content={field.value as LessonContent} onChangeContent={field.onChange} />
              {errors.content && (
                <Typography color='error' variant='caption' sx={{ mt: 1 }}>
                  {errors.content.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>

      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Premium Content
        </Typography>
        <Controller
          name='isPremium'
          control={control}
          render={({ field: { value, onChange } }) => <Switch checked={value} onChange={onChange} />}
        />
      </Box>

      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Required Lesson
        </Typography>
        <Controller
          name='isRequired'
          control={control}
          render={({ field: { value, onChange } }) => <Switch checked={value} onChange={onChange} />}
        />
      </Box>

      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Lesson Weight
        </Typography>
        <Controller
          name='lessonWeight'
          control={control}
          render={({ field }) => (
            <AppInput
              {...field}
              type='number'
              fullWidth
              error={!!errors.lessonWeight}
              placeholder='Enter lesson weight'
              helperText={errors.lessonWeight?.message}
            />
          )}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton onClick={onCancel} sx={{ mr: 1 }} disabled={isLoading}>
          Cancel
        </AppButton>

        {onDelete && (
          <AppButton variant='outlined' onClick={onDelete} sx={{ mr: 1 }} disabled={isLoading}>
            Delete
          </AppButton>
        )}
        <AppButton type='submit' variant='black' disabled={isLoading || !isDirty}>
          {isLoading ? 'Saving...' : 'Save'}
        </AppButton>
      </Box>
    </form>
  )
}

LessonForm.displayName = 'LessonForm'
export default memo(LessonForm)
