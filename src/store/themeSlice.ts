import { createSlice } from '@reduxjs/toolkit'

export type ThemeKey = 'light' | 'dark'

interface ThemeState {
  mode: ThemeKey
}

const initialState: ThemeState = {
  mode: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },

    // Set specific theme
    setTheme: (state, action) => {
      state.mode = action.payload
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
