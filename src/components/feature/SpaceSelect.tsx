import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { MOCK_LEARNING_SPACE } from '~/data/space'
import { clearCurrentSpace, setCurrentSpace } from '~/store/spaceSlice' // Assuming you have these actions
import { RootState } from '~/store/store'
import { Space } from '~/types/space'

function SpaceSelect() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [spaces] = useState<Space[]>(MOCK_LEARNING_SPACE)

  const currentSpace = useSelector((state: RootState) => state.space.currentSpace)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const spaceId = searchParams.get('spaceId')
    if (spaceId) {
      const space = spaces.find((s) => s.id === spaceId)
      if (space) {
        dispatch(
          setCurrentSpace({
            id: space.id,
            name: space.name
          })
        )
      }
    }
  }, [dispatch, location.search, spaces])

  const handleChange = (event: SelectChangeEvent) => {
    const newSpaceId = event.target.value
    if (newSpaceId) {
      const selectedSpace = spaces.find((s) => s.id === newSpaceId)
      if (selectedSpace) {
        dispatch(setCurrentSpace(selectedSpace))
        navigate(`/learning-space?spaceId=${newSpaceId}`)
      }
    } else {
      // If no space is selected, clear current space and reset to main dashboard
      dispatch(clearCurrentSpace())
      navigate('/learning-space')
    }
  }

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id='space-select-label'>Learning Space</InputLabel>
      <Select
        labelId='space-select-label'
        id='space-select'
        value={currentSpace?.id || ''}
        label='Learning Space'
        onChange={handleChange}
        size='small'
      >
        <MenuItem value=''>Reset</MenuItem>
        {spaces.map((space) => (
          <MenuItem key={space.id} value={space.id}>
            {space.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SpaceSelect.displayName = 'SpaceSelect'
export default SpaceSelect
