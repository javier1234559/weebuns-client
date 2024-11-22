export interface VocabItem {
  word: string
  meaning: string
  audioUrl: string
  example: string
  tags: string[]
  createdDate: string
}

export enum RepetitionLevel {
  NEW = 0, // First time
  LEVEL_1 = 1, // Review after 1 day
  LEVEL_2 = 2, // Review after 3 days
  LEVEL_3 = 3, // Review after 7 days
  LEVEL_4 = 4, // Review after 14 days
  LEVEL_5 = 5, // Review after 30 days
  MASTERED = 6 // Review after 90 days
}
