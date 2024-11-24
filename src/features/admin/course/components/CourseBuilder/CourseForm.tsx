import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import React, { memo, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import ContentEditor from '~/components/feature/Editor/ContentEditor'
import UploadImage from '~/components/feature/ImageUpload'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import MultiSelect from '~/components/ui/multiple-select'
import { Select, SelectItem } from '~/components/ui/select'
import { clearCourseFormData, setCourseFormData } from '~/features/admin/course/adminCourseSlice'
import { LANGUAGE_LABELS, LEVEL_LABELS, TARGET_LABELS, TOPIC_LABELS } from '~/features/space/space.constants'
import { LanguageCode, LevelCode, TargetCode, TopicCode } from '~/features/space/space.type'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { RootState } from '~/store/store'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  thumbnailUrl: yup.string().nullable(),
  language: yup.mixed<LanguageCode>().oneOf(Object.values(LanguageCode)).required('Language is required'),
  minLevel: yup.mixed<LevelCode>().oneOf(Object.values(LevelCode)).required('Minimum level is required'),
  maxLevel: yup.mixed<LevelCode>().oneOf(Object.values(LevelCode)).required('Maximum level is required'),
  topics: yup
    .array()
    .of(yup.mixed<TopicCode>().oneOf(Object.values(TopicCode)))
    .min(1, 'Please select at least one topic')
    .required('Topics are required'),
  courseType: yup.mixed<TargetCode>().oneOf(Object.values(TargetCode)).required('Course type is required'),
  isPremium: yup.boolean().required(),
  totalWeight: yup
    .number()
    .required('Total weight is required')
    .min(0, 'Total weight must be positive')
    .integer('Total weight must be a whole number'),
  isPublished: yup.boolean().required()
})

export type CourseFormData = yup.InferType<typeof schema>

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<void>
  isLoading?: boolean
  initialData?: Partial<CourseFormData>
}

const CourseForm = ({ onSubmit, isLoading, initialData }: CourseFormProps) => {
  const dispatch = useDispatch()
  const { isDarkMode } = useEventSwitchDarkMode()
  const [isShowUpload, setIsShowUpload] = React.useState(false)

  // Lấy form data từ redux
  const persistedFormData = useSelector((state: RootState) => state.adminCourse.courseFormData)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CourseFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...persistedFormData,
      ...initialData
    }
  })

  // Watch form changes và update vào redux
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change' && name) {
        dispatch(setCourseFormData({ [name]: value[name as keyof CourseFormData] }))
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, dispatch])

  const handleFormSubmit = async (data: CourseFormData) => {
    await onSubmit(data)
    dispatch(clearCourseFormData()) // clear form after submit
  }

  const renderBasicInfo = () => (
    <Box mb={3}>
      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Course Title
        </Typography>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <AppInput
              {...field}
              fullWidth
              error={!!errors.title}
              placeholder='Enter course title'
              helperText={errors.title?.message}
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Course Description
        </Typography>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <Box>
              <ContentEditor isDark={isDarkMode} content={field.value} onChangeContent={field.onChange} />
              {errors.description && (
                <Typography color='error' variant='caption' sx={{ mt: 1 }}>
                  {errors.description.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  )

  const renderLanguageAndLevels = () => (
    <Box mb={3}>
      <Typography variant='body1' color='text.secondary' gutterBottom>
        Language and Levels
      </Typography>
      <Box display='flex' gap={2}>
        <Controller
          name='language'
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder='Select language'>
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name='minLevel'
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder='Minimum level'>
              {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name='maxLevel'
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder='Maximum level'>
              {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </Box>
    </Box>
  )

  const renderTopics = () => (
    <>
      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Course Topics
        </Typography>
        <MultiSelect
          name='topics'
          control={control}
          placeholder='Select topics'
          options={Object.entries(TOPIC_LABELS).map(([value, label]) => ({
            value,
            label
          }))}
          error={errors.topics?.message}
          fullWidth
        />
      </Box>
      <Box mb={3}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Course Type
        </Typography>
        <Controller
          name='courseType'
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder='Select course type'>
              {Object.entries(TARGET_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </Box>
    </>
  )

  const renderCourseSettings = () => (
    <Box mb={3}>
      <Box display='flex' flexDirection='column' gap={3}>
        <Box display='flex' gap={4}>
          <Controller
            name='isPremium'
            control={control}
            render={({ field }) => (
              <Box display='flex' alignItems='center' gap={2}>
                <Typography>Premium Course</Typography>
                <Switch checked={field.value} onChange={field.onChange} />
              </Box>
            )}
          />
          <Controller
            name='isPublished'
            control={control}
            render={({ field }) => (
              <Box display='flex' alignItems='center' gap={2}>
                <Typography>Publish Course</Typography>
                <Switch checked={field.value} onChange={field.onChange} />
              </Box>
            )}
          />
        </Box>
      </Box>
    </Box>
  )

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <CardTitle>{initialData ? 'Update Course' : 'Create New Course'}</CardTitle>

          {renderBasicInfo()}

          <Box mb={3}>
            <AppButton variant='outlined' onClick={() => setIsShowUpload((prev) => !prev)}>
              {isShowUpload ? 'Hide Thumbnail Upload' : 'Add Course Thumbnail (Optional)'}
            </AppButton>
            {isShowUpload && (
              <Controller
                name='thumbnailUrl'
                control={control}
                render={({ field }) => (
                  <Box mt={2}>
                    <UploadImage value={field.value ?? null} onChange={field.onChange} />
                  </Box>
                )}
              />
            )}
          </Box>

          <Typography variant='h6' mb={2} color='text.secondary' fontWeight={600} gutterBottom>
            Course Details
          </Typography>
          {renderLanguageAndLevels()}
          {renderTopics()}
          <Typography variant='h6' mb={2} color='text.secondary' fontWeight={600} gutterBottom>
            Course Settings
          </Typography>
          {renderCourseSettings()}

          <Box display='flex' justifyContent='flex-end' gap={2}>
            <AppButton type='button' variant='outlined' disabled={isLoading} onClick={() => window.history.back()}>
              Cancel
            </AppButton>
            <AppButton type='submit' variant='contained' color='primary' disabled={isLoading}>
              {isLoading ? 'Submitting...' : initialData ? 'Update Course' : 'Create Course'}
            </AppButton>
          </Box>
        </CardContent>
      </Card>
    </form>
  )
}

export default memo(CourseForm)
