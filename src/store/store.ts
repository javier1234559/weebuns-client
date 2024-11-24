import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { resetAllState } from '~/store/resetSlice'

import AdminCourseReducer from '../features/admin/course/adminCourseSlice'
import AuthReducer from '../features/auth/authSlice'
import CourseReducer from '../features/course/courseSlice'
import EssayReducer from '../features/essay/essaySlice'
import SpaceReducer from '../features/space/spaceSlice'
import VocabReducer from '../features/vocabulary/vocabSlice'
import ModalReducer from './modalSlice'
import ThemeReducer from './themeSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal', 'vocab', 'course']
}

// Combine reducer
const reducers = combineReducers({
  theme: ThemeReducer,
  auth: AuthReducer,
  space: SpaceReducer,
  vocab: VocabReducer,
  modal: ModalReducer,
  essay: EssayReducer,
  course: CourseReducer,
  adminCourse: AdminCourseReducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === resetAllState.type) {
    const { theme } = state // Optional: giữ lại một số state nếu cần
    storage.removeItem('persist:root')
    return reducers({ theme }, action)
  }
  return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
