import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import AppButton from '~/components/common/AppButton'
import { AppInput } from '~/components/common/AppInput'
import { useImageSearch } from '~/features/vocabulary/hooks/useImageSearch'
import { CreateVocabularyDto } from '~/services/api/api-axios'

const vocabularySchema = yup.object({
  term: yup.string().required('Please enter a term'),
  meaning: yup.array().of(yup.string().required()).min(1, 'Please enter at least one meaning'),
  exampleSentence: yup.string().nullable(),
  imageUrl: yup.string().nullable(),
  referenceLink: yup.string().nullable(),
  referenceName: yup.string().nullable(),
  tags: yup.array().of(yup.string()).required()
})

export type VocabularyFormData = yup.InferType<typeof vocabularySchema>

interface VocabularyFormProps {
  initialData?: Partial<CreateVocabularyDto>
  onSuccess: (data: VocabularyFormData) => void
  onCancel?: () => void
}

export const VocabularyForm = ({ initialData, onSuccess, onCancel }: VocabularyFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting }
  } = useForm<VocabularyFormData>({
    resolver: yupResolver(vocabularySchema),
    defaultValues: {
      term: initialData?.term || '',
      meaning: initialData?.meaning || [''],
      exampleSentence: initialData?.exampleSentence || null,
      imageUrl: initialData?.imageUrl || null,
      referenceLink: initialData?.referenceLink || window.location.href,
      referenceName: initialData?.referenceName || 'From English Learning App',
      tags: initialData?.tags || [],
      ...initialData
    }
  })

  const term = watch('term')
  const { imageData, isImageLoading } = useImageSearch(term)

  useEffect(() => {
    if (imageData && !watch('imageUrl')) {
      setValue('imageUrl', imageData.src.medium)
    }
  }, [imageData, setValue, watch])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const vocabularyData = {
      term: data.term,
      meaning: (data?.meaning?.filter(Boolean) || []) as string[],
      exampleSentence: data.exampleSentence,
      imageUrl: data.imageUrl,
      referenceLink: data.referenceLink,
      referenceName: data.referenceName,
      tags: (data?.tags?.filter(Boolean) || []) as string[]
    }
    onSuccess(vocabularyData)
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit(e)
  }

  return (
    <Box component='form' onSubmit={handleFormSubmit} onClick={(e) => e.stopPropagation()}>
      <Stack spacing={2}>
        <Box>
          <Typography variant='body2' mb={1}>
            Term
          </Typography>
          <Controller
            name='term'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppInput fullWidth {...field} placeholder='Enter a term' error={!!error} helperText={error?.message} />
            )}
          />
        </Box>

        <Box>
          <Typography variant='body2' mb={1}>
            Meanings
          </Typography>
          <Controller
            name='meaning'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Stack spacing={1}>
                {(field.value ?? []).map((meaning: string, index: number) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      placeholder={`Enter meaning ${index + 1}`}
                      value={meaning}
                      onChange={(e) => {
                        const newMeanings = [...(field.value ?? [])]
                        newMeanings[index] = e.target.value
                        field.onChange(newMeanings)
                      }}
                      error={!!error}
                      helperText={error?.message}
                    />
                    {(field.value ?? []).length > 1 && (
                      <IconButton
                        size='small'
                        onClick={() => {
                          const newMeanings = (field.value ?? []).filter((_: string, i: number) => i !== index)
                          field.onChange(newMeanings)
                        }}
                      >
                        <X size={18} />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Box>
                  <AppButton
                    type='button'
                    variant='outlined'
                    size='small'
                    onClick={() => {
                      field.onChange([...(field.value ?? []), ''])
                    }}
                  >
                    Add Meaning
                  </AppButton>
                </Box>
              </Stack>
            )}
          />
        </Box>

        <Box>
          <Typography variant='body2' mb={1}>
            Example Sentence
          </Typography>
          <Controller
            name='exampleSentence'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                multiline
                {...field}
                placeholder='Enter an example sentence'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Typography variant='body2' mb={1}>
            Image
          </Typography>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Box>
                <AppInput
                  {...field}
                  fullWidth
                  placeholder='Enter image URL'
                  error={!!error}
                  helperText={isImageLoading ? 'Loading default image...' : error?.message}
                />
                {field.value && (
                  <Box mt={1}>
                    <img
                      src={field.value}
                      alt='Vocabulary'
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={() => {
                        // Handle image load error
                        setValue('imageUrl', null)
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          />
        </Box>

        <Box>
          <Typography variant='body2' mb={1}>
            Reference
          </Typography>
          <Controller
            name='referenceName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AppInput
                fullWidth
                {...field}
                placeholder='Enter reference name'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Box>

        <Controller
          name='tags'
          control={control}
          render={({ field }) => (
            <Box>
              <Typography variant='body2' mb={1}>
                Tags
              </Typography>
              <Box mb={2}>
                {(field.value || []).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant='outlined'
                    deleteIcon={<X size={14} />}
                    onDelete={() => {
                      const newTags = [...field.value].filter(Boolean)
                      newTags.splice(index, 1)
                      field.onChange(newTags)
                    }}
                    sx={{ margin: 0.5 }}
                  />
                ))}
              </Box>
              <AppInput
                fullWidth
                placeholder='Add a tag (press Enter to add)'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const input = e.target as HTMLInputElement
                    if (input.value) {
                      const currentTags = Array.isArray(field.value) ? field.value.filter(Boolean) : []
                      field.onChange([...currentTags, input.value])
                      input.value = ''
                    }
                  }
                }}
              />
            </Box>
          )}
        />

        <Box>
          {onCancel && (
            <AppButton onClick={onCancel} disabled={isSubmitting} variant='outlined' sx={{ mr: 1 }}>
              Cancel
            </AppButton>
          )}
          <AppButton type='submit' variant='black' disabled={isSubmitting}>
            Save
          </AppButton>
        </Box>
      </Stack>
    </Box>
  )
}
