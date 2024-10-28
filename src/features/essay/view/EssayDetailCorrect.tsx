import 'reactjs-tiptap-editor/style.css'

import Box from '@mui/material/Box'
import { Controller } from 'react-hook-form'

import { AppInput } from '~/components/common/AppInput'
import { CardContent, CardTitle } from '~/components/ui/card'
import { FindOneEssayResponseDto } from '~/services/api/api-axios'

interface EssayDetailCorrectProps {
  data: FindOneEssayResponseDto
}

function EssayDetailCorrect({ data }: EssayDetailCorrectProps) {
  const { essay } = data

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <CardTitle>Help this user to correct for this essay</CardTitle>

      <Box display='flex' gap={2}>
        <Box flexGrow={1} flexShrink={1} flexBasis='auto'>
          <Controller
            name='title'
            // control={control}
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
      </Box>
    </CardContent>
  )
}

EssayDetailCorrect.displayName = 'EssayDetailCorrect'
export default EssayDetailCorrect
