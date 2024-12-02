import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CourseFormData } from '~/features/admin/course/components/CourseBuilder/CourseForm'
import { LanguageCode, LevelCode, TargetCode, TopicCode } from '~/features/space/space.type'
import { ContentStatus } from '~/services/api/api-axios'

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
    totalWeight: 0,
    status: ContentStatus.Draft
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
