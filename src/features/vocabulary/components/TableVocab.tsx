import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LevelButtons from '~/features/vocabulary/components/LevelButtons'
import { setSelectedVocabs } from '~/features/vocabulary/vocabSlice'
import { Vocabulary } from '~/services/api/api-axios'
import { RootState } from '~/store/store'

interface TableVocabProps {
  vocabularies: Vocabulary[]
}

export default function TableVocab({ vocabularies }: TableVocabProps) {
  const dispatch = useDispatch()
  const selectedVocabs = useSelector((state: RootState) => state.vocab.selectedVocabList)
  const selected = selectedVocabs.map((vocab) => vocab.id)

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setSelectedVocabs(vocabularies))
    } else {
      dispatch(setSelectedVocabs([]))
    }
  }

  const handleSelect = (vocab: Vocabulary) => {
    const selectedIndex = selected.indexOf(vocab.id)
    let newSelectedVocabs: Vocabulary[] = []

    if (selectedIndex === -1) {
      newSelectedVocabs = [...selectedVocabs, vocab]
    } else {
      newSelectedVocabs = selectedVocabs.filter((v) => v.id !== vocab.id)
    }

    dispatch(setSelectedVocabs(newSelectedVocabs))
  }

  return (
    <TableContainer component={Paper} sx={{ mb: 2, overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox' sx={{ width: '48px' }}>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < vocabularies.length}
                checked={selected.length === vocabularies.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell sx={{ width: '25%' }}>TERM (14)</TableCell>
            <TableCell sx={{ width: '35%' }}>MEANING</TableCell>
            <TableCell sx={{ width: '25%' }}>SOURCE TEXT</TableCell>
            <TableCell sx={{ width: '15%' }}>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocabularies.map((vocab) => (
            <TableRow key={vocab.id} hover>
              <TableCell padding='checkbox'>
                <Checkbox checked={selected.includes(vocab.id)} onChange={() => handleSelect(vocab)} />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  <Typography variant='body1'>{vocab.term}</Typography>
                  <Stack direction='row' spacing={0.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <div>
                      {Array.isArray(vocab.tags) &&
                        vocab.tags.map((tag) => (
                          <Chip key={tag} label={tag} size='small' variant='outlined' sx={{ margin: '2px 0' }} />
                        ))}
                    </div>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  {vocab.imageUrl && (
                    <Box
                      component='img'
                      src={vocab.imageUrl}
                      alt={vocab.term}
                      sx={{
                        height: 80,
                        width: 'auto',
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                  )}
                  {vocab.meaning.map((mean, index) => (
                    <Typography key={index} variant='body2'>
                      • {mean}
                    </Typography>
                  ))}
                </Stack>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  sx={{
                    fontStyle: 'italic',
                    minWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  &quot;{vocab.exampleSentence}&quot;
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  <LevelButtons id={vocab.id} level={vocab.repetitionLevel} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
