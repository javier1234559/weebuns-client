import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LanguageCode, LevelCode, TargetCode, TopicCode } from '~/features/space/space.type'

export interface CourseFormData {
  title: string
  description: string
  thumbnailUrl: string | null
  language: LanguageCode
  minLevel: LevelCode
  maxLevel: LevelCode
  topics: TopicCode[]
  courseType: TargetCode
  isPremium: boolean
  isPublished: boolean
  totalWeight: number
}

interface AdminCourseState {
  courseFormData: CourseFormData
}

const initialState: AdminCourseState = {
  courseFormData: {
    title: '',
    description: '',
    thumbnailUrl: null,
    language: LanguageCode.ENGLISH,
    minLevel: LevelCode.BEGINNER,
    maxLevel: LevelCode.INTERMEDIATE,
    topics: [TopicCode.BUSINESS],
    courseType: TargetCode.OTHER,
    isPremium: false,
    isPublished: false,
    totalWeight: 0
  }
}

const adminCourseSlice = createSlice({
  name: 'adminCourse',
  initialState,
  reducers: {
    setCourseFormData: (state, action: PayloadAction<Partial<CourseFormData>>) => {
      state.courseFormData = { ...state.courseFormData, ...action.payload }
    },
    clearCourseFormData: (state) => {
      state.courseFormData = initialState.courseFormData
    }
  }
})

export const { setCourseFormData, clearCourseFormData } = adminCourseSlice.actions
export default adminCourseSlice.reducer
