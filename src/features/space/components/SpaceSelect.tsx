import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { Select, SelectItem } from '~/components/ui/select'
import { MOCK_LEARNING_SPACE } from '~/features/space/mocks/MOCK_LEARNING_SPACE'
import { Space } from '~/features/space/space.type'
import { clearCurrentSpace, setCurrentSpace } from '~/features/space/spaceSlice' // Assuming you have these actions
import { RootState } from '~/store/store'

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
      <Select value={currentSpace?.id || ''} placeholder='Select language space' onChange={handleChange} name='space'>
        <SelectItem value=''>Reset</SelectItem>
        {spaces.map((space) => (
          <SelectItem key={space.id} value={space.id}>
            {space.name}
          </SelectItem>
        ))}
      </Select>
    </FormControl>
  )
}

SpaceSelect.displayName = 'SpaceSelect'
export default SpaceSelect
