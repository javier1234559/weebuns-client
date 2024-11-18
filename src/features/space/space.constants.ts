import { LanguageCode, LevelCode, TargetCode, TopicCode } from '~/features/space/space.type'

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  [LanguageCode.ENGLISH]: 'English',
  [LanguageCode.VIETNAMESE]: 'Vietnamese'
}

export const LEVEL_LABELS: Record<LevelCode, string> = {
  [LevelCode.BEGINNER]: 'Beginner',
  [LevelCode.ELEMENTARY]: 'Elementary',
  [LevelCode.INTERMEDIATE]: 'Intermediate',
  [LevelCode.UPPER_INTERMEDIATE]: 'Upper Intermediate',
  [LevelCode.ADVANCED]: 'Advanced',
  [LevelCode.MASTER]: 'Proficient'
}

export const TARGET_LABELS: Record<TargetCode, string> = {
  [TargetCode.COMMUNICATION]: 'Communication',
  [TargetCode.IELTS]: 'IELTS Preparation',
  [TargetCode.TOEIC]: 'TOEIC Preparation',
  [TargetCode.OTHER]: 'Other'
}

export const TOPIC_LABELS: Record<TopicCode, string> = {
  [TopicCode.BUSINESS]: 'Business',
  [TopicCode.ACADEMIC]: 'Academic',
  [TopicCode.TRAVEL]: 'Travel',
  [TopicCode.DAILY_LIFE]: 'Daily Life',
  [TopicCode.TECHNOLOGY]: 'Technology',
  [TopicCode.OTHER]: 'Other'
}

export const LEVEL_RANGE: Record<LevelCode, number> = {
  [LevelCode.BEGINNER]: 0,
  [LevelCode.ELEMENTARY]: 1,
  [LevelCode.INTERMEDIATE]: 2,
  [LevelCode.UPPER_INTERMEDIATE]: 3,
  [LevelCode.ADVANCED]: 4,
  [LevelCode.MASTER]: 5
}

export const convertLevelRangeToCode = (range: number[]): string[] => {
  const levels = Object.entries(LEVEL_RANGE)
  const [min, max] = range

  return [
    levels.find(([_, value]) => value === min)?.[0] || LevelCode.BEGINNER,
    levels.find(([_, value]) => value === max)?.[0] || LevelCode.MASTER
  ]
}
