import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import ImageUpload from '~/components/feature/ImageUpload'
import RichTextEditor from '~/components/feature/RichTextEditor'
import { VocabForm } from '~/components/form/VocabForm'
import { CardTitle } from '~/components/ui/Card'

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
          <CardContent>
            <Controller
              name='title'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label='Title'
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  sx={{ marginBottom: 2 }}
                />
              )}
            />

            <Controller
              name='content'
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  // error={!!error}
                  // helperText={error?.message}
                />
              )}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ marginBottom: 3 }}>
          <CardHeader title={<CardTitle>Featured Image</CardTitle>} />
          <CardContent>
            <Controller
              name='featuredImage'
              control={control}
              render={({ field }) => <ImageUpload value={field.value} onChange={(file) => field.onChange(file)} />}
            />
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: 3 }}>
          <CardHeader title={<CardTitle>Essay Details</CardTitle>} />
          <CardContent>
            <Controller
              name='language'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error} sx={{ marginBottom: 2 }}>
                  <InputLabel>Language</InputLabel>
                  <Select {...field} label='Language'>
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='es'>Spanish</MenuItem>
                    {/* Add more languages as needed */}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name='hashtags'
              control={control}
              render={({ field }) => (
                <Box>
                  <InputLabel>Hashtags</InputLabel>
                  {field.value.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => {
                        const newTags = [...field.value]
                        newTags.splice(index, 1)
                        field.onChange(newTags)
                      }}
                      sx={{ margin: 0.5 }}
                    />
                  ))}
                  <TextField
                    fullWidth
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={<CardTitle>Vocabulary</CardTitle>} />
          <CardContent>
            <VocabForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
})

CreateEssayForm.displayName = 'CreateEssayForm'

export default React.memo(CreateEssayForm)
