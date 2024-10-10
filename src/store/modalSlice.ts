import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'

interface ModalState {
  isOpen: boolean
  content: ReactNode | null
  title: string | null
  isConfirm: boolean
  confirmText: string
  cancelText: string
  onConfirm: (() => void) | null
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  title: null,
  isConfirm: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Partial<ModalState>>) => {
      return { ...state, isOpen: true, ...action.payload }
    },
    closeModal: () => {
      return { ...initialState }
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
