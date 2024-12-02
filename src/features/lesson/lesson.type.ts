export interface LessonContent {
  blocks: Block[]
  metadata: {
    lastUpdated: string
    updatedById: string
  }
}

export interface Block {
  id: string
  type: 'text' | 'quiz' | 'dictation'
  order: number
  content: TextContent | QuizContent | DictationContent
}

export interface TextContent {
  html: string
}

export interface QuizContent {
  title: string
  questions: QuestionContent[]
}

export interface QuestionContent {
  id: string
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation?: string
}

export interface DictationContent {
  audioUrl: string
  text: string // HTML content
}
