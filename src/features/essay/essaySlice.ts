import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'

interface EssayState {
  essayFormData: EssayFormData
  essayViewData: EssayFormData
}

const initialState: EssayState = {
  essayFormData: {
    title: '',
    content: '',
    cover_url: null,
    language: 'en',
    hashtags: []
  },
  essayViewData: {
    title: '',
    content: '',
    cover_url: null,
    language: 'en',
    hashtags: []
  }
}

export const essaySlice = createSlice({
  name: 'essay',
  initialState,
  reducers: {
    setEssayData: (state, action: PayloadAction<Partial<EssayFormData>>) => {
      state.essayFormData = { ...state.essayFormData, ...action.payload }
    },
    clearEssayData: (state) => {
      state.essayFormData = initialState.essayFormData
    },
    loadEssayData: (state, action: PayloadAction<EssayFormData>) => {
      state.essayFormData = action.payload
    },
    setEssayViewData: (state, action: PayloadAction<Partial<EssayFormData>>) => {
      state.essayViewData = { ...state.essayViewData, ...action.payload }
    },
    clearEssayViewData: (state) => {
      state.essayViewData = initialState.essayViewData
    },
    clearAllEssayData: (state) => {
      state.essayViewData = initialState.essayViewData
      state.essayFormData = initialState.essayFormData
    }
  }
})

export const { setEssayData, clearEssayData, loadEssayData, setEssayViewData, clearEssayViewData, clearAllEssayData } =
  essaySlice.actions
export default essaySlice.reducer
