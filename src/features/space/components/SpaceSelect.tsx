import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { Select, SelectItem } from '~/components/ui/select'
import { useSpacesByUserSelect } from '~/features/space/hooks/useSpaceQueries'
import { clearCurrentSpace, setCurrentSpace } from '~/features/space/spaceSlice' // Assuming you have these actions
import { RootState } from '~/store/store'

function SpaceSelect() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentSpace = useSelector((state: RootState) => state.space.currentSpace)
  const idCurrentUser = useSelector((state: RootState) => state.auth.id)

  const { loading, data } = useSpacesByUserSelect(idCurrentUser)

  const spaces = useMemo(() => data?.getUserSpaces.data || [], [data])

  useEffect(() => {
    if (!loading && spaces.length > 0) {
      const searchParams = new URLSearchParams(location.search)
      const spaceId = searchParams.get('spaceId')
      if (spaceId) {
        const space = spaces.find((s) => s.id === spaceId)
        if (space) {
          toast.success(`Switched to ${space.name}`)
          dispatch(
            setCurrentSpace({
              id: space.id,
              name: space.name
            })
          )
        }
      }
    }
  }, [dispatch, location.search, spaces, loading])

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
