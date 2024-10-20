import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { X } from 'lucide-react'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import AppInput from '~/components/common/AppInput'
import ContentEditor from '~/components/feature/Editor/ContentEditor'
import ImageUpload from '~/components/feature/ImageUpload'
import { VocabForm } from '~/components/form/VocabForm'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Select, SelectItem } from '~/components/ui/select'
import { useEventSwitchDarkMode } from '~/hooks/event'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  featuredImage: yup.mixed<File>().nullable().defined(),
  language: yup.string().required('Language is required'),
  hashtags: yup.array().of(yup.string().required()).defined()
})

export interface CreateEssayFormData {
  title: string
  content: string
  featuredImage: File | null
  language: string
  hashtags: string[]
}

export interface CreateEssayFormRef {
  submitForm: () => Promise<CreateEssayFormData | undefined>
  getValues: () => CreateEssayFormData
}

const CreateEssayForm = forwardRef<CreateEssayFormRef, object>((_, ref) => {
  const { isDarkMode } = useEventSwitchDarkMode()
  const { control, handleSubmit, getValues } = useForm<CreateEssayFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      featuredImage: null,
      language: '',
      hashtags: []
    }
  })

  const getSummary = (content: string) => {
    const sentences = content.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
    return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '')
  }

  const onSubmit = (data: CreateEssayFormData) => {
    const summaryData = {
      ...data,
      summary: getSummary(data.content)
    }
    console.log(summaryData)
    // Handle form submission with summary
    return summaryData
  }

  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)().then((data) => data as CreateEssayFormData | undefined),
    getValues
  }))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CardTitle>Write a new post</CardTitle>
            <Controller
              name='featuredImage'
              control={control}
              render={({ field }) => <ImageUpload value={field.value} onChange={(file) => field.onChange(file)} />}
            />
            <Box display='flex' gap={2}>
              <Box flexGrow={1} flexShrink={1} flexBasis='auto'>
                <Controller
                  name='title'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <AppInput
                      {...field}
                      fullWidth
                      error={!!error}
                      placeholder='Write a title'
                      helperText={error?.message}
                      variant='outlined'
                    />
                  )}
                />
              </Box>
              <Box flexGrow={0} flexShrink={0} flexBasis='auto'>
                <Controller
                  name='language'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder='Language'>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Spanish</SelectItem>
                    </Select>
                  )}
                />
              </Box>
            </Box>
            <Controller
              name='content'
              control={control}
              render={({ field }) => (
                <ContentEditor isDark={isDarkMode} content={field.value} onChangeContent={field.onChange} />
              )}
            />

            <Box my={2}>
              <Controller
                name='hashtags'
                control={control}
                render={({ field }) => (
                  <Box>
                    <Typography variant='h6' mb={1}>
                      Hashtags
                    </Typography>
                    {field.value.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant='outlined'
                        deleteIcon={<X size={14} />}
                        onDelete={() => {
                          const newTags = [...field.value]
                          newTags.splice(index, 1)
                          field.onChange(newTags)
                        }}
                        sx={{ margin: 0.5 }}
                      />
                    ))}
                    <AppInput
                      fullWidth
                      sx={{ marginTop: 2 }}
                      placeholder='Add a hashtag'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const input = e.target as HTMLInputElement
                          if (input.value) {
                            field.onChange([...field.value, input.value])
                            input.value = ''
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <CardTitle
              sx={{
                marginBottom: 1
              }}
            >
              Write a new post
            </CardTitle>
            <VocabForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
})

CreateEssayForm.displayName = 'CreateEssayForm'

export default React.memo(CreateEssayForm)
