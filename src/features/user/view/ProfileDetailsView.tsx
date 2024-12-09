import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import AppButton from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import AppLoading from '~/components/common/AppLoading'
import AvatarUpload from '~/components/feature/AvatarUpload'
import { updateProfile } from '~/features/auth/authSlice'
import authApi from '~/features/auth/services/authApi'
import { LANGUAGE_LABELS } from '~/features/space/space.constants'
import { LanguageCode } from '~/features/space/space.type'
import { useLoadingToast } from '~/hooks/useLoadingToast'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  nativeLanguage: yup
    .string()
    .required('Please select a language')
    .oneOf(Object.values(LanguageCode), 'Please select a valid language'),
  profilePicture: yup.string().nullable()
})

type ProfileFormData = yup.InferType<typeof schema>

const ProfileDetails = () => {
  const [currentUser, setCurrentUser] = useState<{ id: string; isEmailVerified: boolean } | null>(null)
  const { runWithLoading } = useLoadingToast()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors }
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const result = await authApi.getCurrentUser()

      const user = result?.data.user

      if (!user) return

      setCurrentUser({
        id: user.id,
        isEmailVerified: user.isEmailVerified
      })

      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email,
        username: user.username,
        nativeLanguage: user.nativeLanguage as LanguageCode,
        profilePicture: user.profilePicture ?? ''
      })
    } catch (error) {
      console.error('Profile load failed:', error)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    if (!currentUser?.id) return

    console.log(data)

    try {
      const result = await runWithLoading(() => authApi.updateProfile(currentUser.id, data), {
        loadingMessage: 'Updating profile...',
        successMessage: 'Profile updated successfully',
        errorMessage: 'Failed to update profile'
      })

      if (result) {
        dispatch(
          updateProfile({
            email: result.user.email,
            name: `${result.user.username}`,
            avatar_img: result.user.profilePicture,
            role: result.user.role
          })
        )
      }
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  if (!currentUser) return <AppLoading />

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ margin: '1rem auto' }}>
      <Typography variant='h5' gutterBottom>
        Profile Settings
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant='subtitle1' gutterBottom>
          Avatar
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <AvatarUpload value={watch('profilePicture') ?? null} onChange={(url) => setValue('profilePicture', url)} />
          <Typography variant='caption' color='text.secondary'>
            Recommended: Square JPG, PNG. Max 5MB
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <AppInput
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
          />
          <AppInput
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />
        </Box>

        <AppInput
          {...register('email')}
          type='email'
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            endAdornment: currentUser.isEmailVerified ? (
              <Typography variant='caption' color='success.main'>
                Verified
              </Typography>
            ) : (
              <Button size='small'>Verify</Button>
            )
          }}
          fullWidth
        />

        <AppInput {...register('username')} error={!!errors.username} helperText={errors.username?.message} fullWidth />

        <Controller
          name='nativeLanguage'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              error={!!errors.nativeLanguage}
              helperText={errors.nativeLanguage?.message}
            >
              {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <AppButton type='submit' variant='black'>
          Save Changes
        </AppButton>
      </Box>
    </Box>
  )
}

export default ProfileDetails
