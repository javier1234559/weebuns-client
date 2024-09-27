import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  name: string | null
  email: string | null
  avatar_img: string | null
  accessToken: string | null
  role: string | null
}

const initialState: AuthState = {
  name: 'Guest',
  email: '',
  avatar_img: '',
  accessToken: '',
  role: ''
}

interface LoginPayload {
  name: string
  email: string
  avatar_img: string
  accessToken: string
  role: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatar_img = action.payload.avatar_img
      state.accessToken = action.payload.accessToken
      state.role = action.payload.role
    },
    logout: (state) => {
      state.name = null
      state.email = null
      state.avatar_img = null
      state.accessToken = null
      state.role = null
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
