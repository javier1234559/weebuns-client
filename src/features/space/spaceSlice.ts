import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Space {
  id: string
  name: string
  // Add other properties as needed
}

interface SpaceState {
  currentSpace: Space | null
  lastFetched: number | null
}

const initialState: SpaceState = {
  currentSpace: null,
  lastFetched: null
}

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setCurrentSpace: (state, action: PayloadAction<Space>) => {
      state.currentSpace = action.payload
      state.lastFetched = Date.now()
    },
    clearCurrentSpace: (state) => {
      state.currentSpace = null
      state.lastFetched = null
    }
  }
})

export const { setCurrentSpace, clearCurrentSpace } = spaceSlice.actions
export default spaceSlice.reducer
