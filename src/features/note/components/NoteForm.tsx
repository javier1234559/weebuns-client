import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Save, Trash2, Undo2, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import AppInput from '~/components/common/AppInput'
import EssayEditor from '~/components/feature/Editor/EssayEditor'
import { useCreateOrUpdateNote, useDeleteNote } from '~/features/note/hooks/useNoteQueries'
import { useEventSwitchDarkMode } from '~/hooks/event'
import { Note } from '~/services/api/api-axios'
import { RootState } from '~/store/store'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  hashtags: yup.array().of(yup.string()).default([])
})

type FormData = yup.InferType<typeof schema>

interface NoteFormProps {
  data: Note
  onCancel: () => void
  onSave: () => void
}

const NoteForm = ({ data, onCancel, onSave }: NoteFormProps) => {
  const spaceId = useSelector((state: RootState) => state.space.currentSpace?.id)
  const { isDarkMode } = useEventSwitchDarkMode()

  const [searchParams] = useSearchParams()
  const { id } = useParams<{ id: string }>()
  const courseId = id
  const unitId = searchParams.get('unitId')

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: data.title,
      content: data.content,
      hashtags: data.tags || []
    }
  })

  const createOrUpdateNote = useCreateOrUpdateNote()
  const deleteNote = useDeleteNote()

  const onSubmit = async (formData: FormData) => {
    const payload: any = {
      spaceId: spaceId as string,
      title: formData.title,
      content: formData.content,
      tags: formData.hashtags.filter((tag): tag is string => tag !== undefined),
      lessonId: data.lessonId
    }

    if (courseId) {
      payload.courseId = courseId
    }

    if (unitId) {
      payload.unitId = unitId
    }

    console.log('payload', payload)

    await createOrUpdateNote.mutateAsync(payload)
    onSave?.()
    toast.success('Note saved successfully')
  }

  const handleDelete = async () => {
    await deleteNote.mutateAsync(data.id)
    onCancel?.()
    toast.success('Note deleted successfully')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ my: 2 }}
            variant='outlined'
            size='small'
          />
        )}
      />

      <Box sx={{ mb: 2 }}>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <Box>
              <EssayEditor isDark={isDarkMode} content={field.value} onChangeContent={field.onChange} />
              {errors.content && (
                <Typography color='error' variant='caption'>
                  {errors.content.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>

      <Controller
        name='hashtags'
        control={control}
        render={({ field }) => (
          <Box my={2}>
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

      <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <IconButton onClick={onCancel}>
          <Undo2 size={20} />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Trash2 size={20} />
        </IconButton>
        <IconButton type='submit'>
          <Save size={20} />
        </IconButton>
      </Box>
    </form>
  )
}

export default NoteForm
