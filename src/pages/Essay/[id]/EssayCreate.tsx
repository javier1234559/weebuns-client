import 'react-quill/dist/quill.snow.css' // Import styles

import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
]

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return <ReactQuill theme='snow' value={value} onChange={onChange} modules={modules} formats={formats} />
}

interface ImageUploadProps {
  value: File | null
  onChange: (file: File | null) => void
}

function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    onChange(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <Box>
      {preview && <img src={preview} alt='Preview' style={{ maxWidth: '100%', marginBottom: 8 }} />}
      <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' type='file' onChange={handleChange} />
      <label htmlFor='raised-button-file'>
        <Button variant='outlined' component='span'>
          Upload Image
        </Button>
      </label>
    </Box>
  )
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3)
}))

interface FormData {
  title: string
  content: string
  featuredImage: File | null
  excerpt: string
}

function EssayCreate() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
      featuredImage: null,
      excerpt: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Handle form submission
  }

  const watchExcerpt = watch('excerpt')

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Link color='inherit' href='/blog'>
          Blog
        </Link>
        <Typography color='textPrimary'>New post</Typography>
      </Breadcrumbs>

      <Typography variant='h4' gutterBottom>
        Write a new post
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Controller
                name='title'
                control={control}
                rules={{ required: 'Title is required' }}
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
                rules={{ required: 'Content is required' }}
                render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
              />
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant='h6' gutterBottom>
                Featured Image
              </Typography>
              <Controller
                name='featuredImage'
                control={control}
                render={({ field }) => <ImageUpload value={field.value} onChange={(file) => field.onChange(file)} />}
              />
            </StyledPaper>

            <StyledPaper>
              <Typography variant='h6' gutterBottom>
                Excerpt
              </Typography>
              <Controller
                name='excerpt'
                control={control}
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    minRows={3}
                    placeholder='Enter excerpt here...'
                    style={{ width: '100%', padding: '8px' }}
                  />
                )}
              />
              <Typography variant='caption' display='block' sx={{ marginTop: 1 }}>
                {200 - (watchExcerpt?.length || 0)} characters remaining
              </Typography>
            </StyledPaper>

            <StyledPaper>
              <Typography variant='h6' gutterBottom>
                Comments
              </Typography>
              {/* Add comment settings here */}
            </StyledPaper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button sx={{ marginRight: 1 }}>Preview</Button>
          <Button sx={{ marginRight: 1 }}>Save as Draft</Button>
          <Button type='submit' variant='contained' color='primary'>
            Publish
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EssayCreate
