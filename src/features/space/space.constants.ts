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
