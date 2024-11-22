import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Bookmark, Search, SquareArrowOutUpRight } from 'lucide-react'
import { useState } from 'react'

import NoteCard from '~/features/note/components/NoteCard'
import { MOCK_NOTES } from '~/features/note/mocks/MOCK_NOTES'

const MasonryGrid = styled(Box)(({ theme }) => ({
  columnCount: 1,
  columnGap: theme.spacing(3),
  '& > *': {
    breakInside: 'avoid',
    marginBottom: theme.spacing(3),
    display: 'inline-block',
    width: '100%' // Critical for proper column behavior
  },
  [theme.breakpoints.up('sm')]: {
    columnCount: 2
  },
  [theme.breakpoints.up('md')]: {
    columnCount: 3
  }
}))

export default function NoteGridView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [notes, setNotes] = useState(MOCK_NOTES)
  const [filter, setFilter] = useState('all')

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (filter === 'bookmarked') return matchesSearch && note.isBookmarked
    if (filter === 'not-bookmarked') return matchesSearch && !note.isBookmarked
    return matchesSearch
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder='Search notes...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search size={20} />
              </InputAdornment>
            )
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter notes</InputLabel>
          <Select value={filter} label='Filter notes' onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value='all'>Show All</MenuItem>
            <MenuItem value='bookmarked'>Bookmarked</MenuItem>
            <MenuItem value='not-bookmarked'>Not Bookmarked</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MasonryGrid>
        {filteredNotes.map((note) => (
          <NoteCard data={note} key={note.id} />
        ))}
      </MasonryGrid>
    </Box>
  )
}
