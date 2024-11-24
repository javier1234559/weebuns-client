import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { Search } from 'lucide-react'
import { useState } from 'react'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import PaginationUrl from '~/components/feature/PaginationUrl'
import NoteCard from '~/features/note/components/NoteCard'
import { useNotes } from '~/features/note/hooks/useNoteQueries'
import usePagination from '~/hooks/usePagination'

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
  const [filter, setFilter] = useState<'all' | 'bookmarked'>('all')

  const { page, perPage, search, tags, searchParam, setSearch, updateQueryParams } = usePagination({
    defaultPage: 1,
    defaultPerPage: 10
  })

  const { data, isLoading, error } = useNotes({
    page,
    perPage,
    search: searchParam || undefined,
    tags: tags,
    isBookmarked: filter === 'bookmarked' ? true : undefined
  })

  const handleFilterChange = (value: 'all' | 'bookmarked') => {
    setFilter(value)
    updateQueryParams({ page: 1 }) // Reset to first page when changing filter
  }

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError error={error} />

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder='Search notes...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
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
          <Select
            value={filter}
            label='Filter notes'
            onChange={(e) => handleFilterChange(e.target.value as 'all' | 'bookmarked')}
          >
            <MenuItem value='all'>Show All</MenuItem>
            <MenuItem value='bookmarked'>Bookmarked</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MasonryGrid>
        {data.data.map((note) => (
          <NoteCard key={note.id} data={note} />
        ))}
      </MasonryGrid>

      <Box mt={4}>
        <PaginationUrl
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        />
      </Box>
    </Box>
  )
}
