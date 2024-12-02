import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  isPremium: yup.boolean().default(false)
})

export type UnitFormData = yup.InferType<typeof schema>

interface UnitFormProps {
  onSubmit: (data: UnitFormData) => Promise<void>
  onDelete?: () => void
  onCancel(): void
  isLoading?: boolean
  initialData?: Partial<UnitFormData>
}

const UnitForm = ({ onSubmit, onDelete, isLoading, initialData, onCancel }: UnitFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<UnitFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      isPremium: initialData?.isPremium ?? false,
      ...initialData
    }
  })

  console.log(initialData)

  const handleFormSubmit = async (data: UnitFormData) => {
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
              placeholder='Enter unit title'
              helperText={errors.title?.message}
            />
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

UnitForm.displayName = 'UnitForm'
export default memo(UnitForm)
