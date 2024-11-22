import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import AppButton from '~/components/common/AppButton'
import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import NoteCard from '~/features/note/components/NoteCard'
import NoteForm from '~/features/note/components/NoteForm'
import { useGetUnitNote } from '~/features/unit/hooks/useUnitQueries'
import { Note } from '~/services/api/api-axios'

interface UnitNoteProps {
  id: string
}

function UnitNote({ id }: UnitNoteProps) {
  const { data, isLoading, error } = useGetUnitNote(id)
  const [isShowForm, setIsShowForm] = useState(false)

  if (isLoading) return <AppLoading />
  if (error) return <AppError message={error.message} />

  const defaultData = {
    title: '',
    content: '',
    tags: [],
    unitId: id
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data?.note ? (
        <NoteCard data={data.note} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Note does not exist yet
          </Typography>
          <AppButton startIcon={<Plus size={14} />} variant='black' onClick={() => setIsShowForm(true)}>
            Create Note
          </AppButton>
        </Box>
      )}

      {isShowForm && (
        <NoteForm
          data={data?.note || (defaultData as unknown as Note)}
          onCancel={() => setIsShowForm(false)}
          onSave={() => setIsShowForm(false)}
        />
      )}
    </Box>
  )
}

export default UnitNote