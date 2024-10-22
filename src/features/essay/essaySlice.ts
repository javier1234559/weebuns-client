import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CreateEssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'

interface EssayState {
  essayData: CreateEssayFormData | null
  isPreview: boolean
  isHiddenVocabTab: boolean
}

const initialState: EssayState = {
  essayData: null,
  isPreview: false,
  isHiddenVocabTab: false
}

const essaySlice = createSlice({
  name: 'essay',
  initialState,
  reducers: {
    setEssayData: (state, action: PayloadAction<CreateEssayFormData>) => {
      state.essayData = action.payload
    },
    setIsPreview: (state, action: PayloadAction<boolean>) => {
      state.isPreview = action.payload
    },
    setIsHiddenVocabTab: (state, action: PayloadAction<boolean>) => {
      state.isHiddenVocabTab = action.payload
    }
  }
})

export const { setEssayData, setIsPreview, setIsHiddenVocabTab } = essaySlice.actions
export default essaySlice.reducer
