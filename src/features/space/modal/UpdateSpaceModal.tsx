import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { AppButton } from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import AppLoading from '~/components/common/AppLoading'
import { useSpacesById, useUpdateSpace } from '~/features/space/hooks/useSpaceQueries'

interface UpdateSpaceModalProps {
  idSpace: string
  onClose: () => void
}

// Define the form schema
const updateSpaceSchema = yup.object({
  name: yup.string().min(1, 'Space name is required').max(100, 'Space name must be less than 100 characters'),
  description: yup.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters')
})

type UpdateSpaceFormData = yup.InferType<typeof updateSpaceSchema>

function UpdateSpaceModal({ idSpace, onClose }: UpdateSpaceModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateSpaceFormData>({
    resolver: yupResolver(updateSpaceSchema)
  })

  const { data, isLoading } = useSpacesById(idSpace, {
    enabled: !!idSpace
  })

  // Use useEffect to reset form when data arrives
  useEffect(() => {
    if (data) {
      console.log('Setting form data:', data)
      reset({
        name: data.space.name,
        description: data.space.description ?? ''
      })
    }
  }, [data, reset])

  const updateSpace = useUpdateSpace({
    onSuccess: () => {
      toast.success('Space updated successfully')
      onClose()
    },
    onError: (error) => {
      toast.error('Failed to update space')
      console.error(error)
    }
  })

  const onSubmit = async (data: UpdateSpaceFormData) => {
    try {
      await updateSpace.mutateAsync({ id: idSpace, data })
      toast.success('Space updated successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to create space:')
      console.error(error)
    }
  }

  if (isLoading) return <AppLoading />

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: 300 }}>
      <Typography variant='h6' component='h2' id='modal-title' gutterBottom>
        Update New Space
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
          Update Space
        </AppButton>
      </Box>
    </Box>
  )
}

export default UpdateSpaceModal
