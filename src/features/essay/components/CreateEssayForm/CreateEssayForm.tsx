import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { X } from 'lucide-react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

import AppInput from '~/components/common/AppInput'
import ContentEditor from '~/components/feature/Editor/ContentEditor'
import ImageUpload from '~/components/feature/ImageUpload'
import { Card, CardContent, CardTitle } from '~/components/ui/card'
import { Select, SelectItem } from '~/components/ui/select'
import { useEventSwitchDarkMode } from '~/hooks/event'

export interface CreateEssayFormData {
  title: string
  content: string
  featuredImage: File | null
  language: string
  hashtags: string[]
}

interface CreateEssayFormProps {
  control: Control<CreateEssayFormData>
}

const CreateEssayForm: React.FC<CreateEssayFormProps> = ({ control }) => {
  const { isDarkMode } = useEventSwitchDarkMode()

  return (
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
  )
}

export default React.memo(CreateEssayForm)
