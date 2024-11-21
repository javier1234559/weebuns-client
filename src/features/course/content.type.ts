export enum CourseType {
  THEORY = 'theory',
  EXERCISE = 'exercise'
}

export const COURSE_TYPE_LABELS: Record<CourseType, string> = {
  [CourseType.THEORY]: 'theory',
  [CourseType.EXERCISE]: 'exercise'
}
