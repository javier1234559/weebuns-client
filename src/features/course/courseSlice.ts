import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CourseProgress, LessonLearnDto, UnitLearnDto } from '~/services/api/api-axios'

interface NavigationState {
  currentUnit: UnitLearnDto | null
  currentLesson: LessonLearnDto | null
  nextUnit: UnitLearnDto | null
  nextLesson: LessonLearnDto | null
  isLastLesson: boolean
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
    currentLessonId: '',
    nextUnitId: '',
    nextLessonId: '',
    completedWeight: 0,
    lastAccessedAt: '',
    completedUnits: [''],
    completedLessons: ['']
  },
  navigation: {
    currentUnit: null,
    currentLesson: null,
    nextUnit: null,
    nextLesson: null,
    isLastLesson: false
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
