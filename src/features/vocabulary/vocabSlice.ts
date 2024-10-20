import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface VocabItem {
  id: number
  word: string
  phonetics: string
  definition: string
  example: string
  picture: string
  sourceLink: string
}

interface VocabState {
  items: VocabItem[]
  currentItem: VocabItem | null
}

const initialState: VocabState = {
  items: [],
  currentItem: null
}

const vocabSlice = createSlice({
  name: 'vocab',
  initialState,
  reducers: {
    addVocabItem: (state, action: PayloadAction<VocabItem>) => {
      state.items.push(action.payload)
    },
    updateVocabItem: (state, action: PayloadAction<VocabItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteVocabItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setCurrentItem: (state, action: PayloadAction<VocabItem | null>) => {
      state.currentItem = action.payload
    },
    clearAllItems: (state) => {
      state.items = []
      state.currentItem = null
    }
  }
})

export const { addVocabItem, updateVocabItem, deleteVocabItem, setCurrentItem, clearAllItems } = vocabSlice.actions

export default vocabSlice.reducer
