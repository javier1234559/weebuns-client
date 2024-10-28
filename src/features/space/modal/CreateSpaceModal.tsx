import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import { useCreateSpace } from '~/features/space/hooks/useSpaceQueries'

interface CreateSpaceModalProps {
  idUser: string
  onClose: () => void
}

// Define the form schema
const createSpaceSchema = yup.object({
  name: yup
    .string()
    .required('Space name is required')
    .min(1, 'Space name is required')
    .max(100, 'Space name must be less than 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters')
})

type CreateSpaceFormData = yup.InferType<typeof createSpaceSchema>

function CreateSpaceModal({ idUser, onClose }: CreateSpaceModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateSpaceFormData>({
    resolver: yupResolver(createSpaceSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })
  const mutate = useCreateSpace()

  const onSubmit = async (data: CreateSpaceFormData) => {
    try {
      await mutate.mutateAsync({
        name: data.name,
        description: data.description,
        created_by: idUser
      })
      toast.success('Space created successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to create space:')
      console.error(error)
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: 300 }}>
      <Typography variant='h6' component='h2' id='modal-title' gutterBottom>
        Create New Space
      </Typography>
      <Typography id='modal-description' variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
        This to help you manage learning resources
      </Typography>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <AppInput
            {...field}
            fullWidth
            error={!!errors.name}
            placeholder='Write a space name'
            helperText={errors.name?.message}
            variant='outlined'
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <AppInput
            {...field}
            fullWidth
            error={!!errors.description}
            placeholder='Write a description'
            helperText={errors.description?.message}
            variant='outlined'
            rows={4}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2
        }}
      >
        <AppButton onClick={onClose} disabled={isSubmitting} variant='outlined'>
          Cancel
        </AppButton>
        <AppButton type='submit' variant='black' disabled={isSubmitting}>
          Create Space
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateSpaceModal
