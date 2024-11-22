import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Vocabulary } from '~/services/api/api-axios'

interface VocabState {
  selectedVocabList: Vocabulary[]
}

interface UpdateVocabPayload {
  id: string
  data: Partial<Vocabulary>
}

const initialState: VocabState = {
  selectedVocabList: []
}

const vocabSlice = createSlice({
  name: 'vocab',
  initialState,
  reducers: {
    setSelectedVocabs: (state, action: PayloadAction<Vocabulary[]>) => {
      state.selectedVocabList = action.payload
    },
    addSelectedVocab: (state, action: PayloadAction<Vocabulary>) => {
      state.selectedVocabList.push(action.payload)
    },
    removeSelectedVocab: (state, action: PayloadAction<string>) => {
      state.selectedVocabList = state.selectedVocabList.filter((vocab) => vocab.id !== action.payload)
    },
    updateSelectedVocab: (state, action: PayloadAction<UpdateVocabPayload>) => {
      const { id, data } = action.payload
      state.selectedVocabList = state.selectedVocabList.map((vocab) =>
        vocab.id === id ? { ...vocab, ...data } : vocab
      )
    },
    clearSelectedVocabs: (state) => {
      state.selectedVocabList = []
    },
    clearAllVocabData(state) {
      state.selectedVocabList = []
    }
  }
})

export const {
  setSelectedVocabs,
  addSelectedVocab,
  removeSelectedVocab,
  updateSelectedVocab,
  clearSelectedVocabs,
  clearAllVocabData
} = vocabSlice.actions

export default vocabSlice.reducer
