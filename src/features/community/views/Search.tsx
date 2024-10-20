import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { SearchIcon } from 'lucide-react'

function SearchCommunity() {
  return (
    <TextField
      fullWidth
      variant='outlined'
      placeholder='Search essays...'
      sx={{ mb: 4 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchCommunity
