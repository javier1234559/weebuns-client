import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteToken, setToken } from '~/utils/token'

interface AuthState {
  id: string | null
  name: string | null
  email: string | null
  avatar_img: string | null
  accessToken: string | null
  role: string | null
}

const initialState: AuthState = {
  id: '',
  name: 'Guest',
  email: '',
  avatar_img: '',
  accessToken: '',
  role: ''
}

interface LoginPayload {
  id: string
  name: string
  email: string
  avatar_img: string | null
  accessToken: string
  role: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatar_img = action.payload.avatar_img
      state.accessToken = action.payload.accessToken
      state.role = action.payload.role

      setToken(action.payload.accessToken)
    },
    logout: (state) => {
      state.id = null
      state.name = null
      state.email = null
      state.avatar_img = null
      state.accessToken = null
      state.role = null

      deleteToken()
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
