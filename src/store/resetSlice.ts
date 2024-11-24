import { createSlice } from '@reduxjs/toolkit'

const resetSlice = createSlice({
  name: 'reset',
  initialState: {},
  reducers: {
    resetAllState: () => {}
  }
})

export const { resetAllState } = resetSlice.actions
export default resetSlice.reducer
