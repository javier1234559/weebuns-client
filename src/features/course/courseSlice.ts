import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CourseProgress, Unit, UnitContent } from '~/services/api/api-axios'

interface NavigationState {
  currentUnit: Unit | null
  currentContent: UnitContent | null
  nextUnit: Unit | null
  nextContent: UnitContent | null
  isLastContent: boolean
}

interface CourseState {
  currentCourseProgress: CourseProgress
  navigation: NavigationState
}

const initialState: CourseState = {
  currentCourseProgress: {
    id: '',
    userId: '',
    courseId: '',
    currentUnitId: '',
    currentUnitContentId: '',
    nextUnitId: '',
    nextUnitContentId: '',
    completedWeight: 0,
    lastAccessedAt: '',
    completedUnits: [''],
    completedContents: ['']
  },
  navigation: {
    currentUnit: null,
    currentContent: null,
    nextUnit: null,
    nextContent: null,
    isLastContent: false
  }
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<Partial<NavigationState>>) => {
      state.navigation = { ...state.navigation, ...action.payload }
    },
    setCourseProgress: (state, action: PayloadAction<Partial<CourseProgress>>) => {
      console.log(action.payload)
      state.currentCourseProgress = { ...state.currentCourseProgress, ...action.payload }
    },
    clearCourseProgress: (state) => {
      state.currentCourseProgress = initialState.currentCourseProgress
    },
    clearAllCourseData: (state) => {
      state.currentCourseProgress = initialState.currentCourseProgress
      state.navigation = initialState.navigation
    }
  }
})

export const { setCourseProgress, clearCourseProgress, setNavigation, clearAllCourseData } = courseSlice.actions
export default courseSlice.reducer
