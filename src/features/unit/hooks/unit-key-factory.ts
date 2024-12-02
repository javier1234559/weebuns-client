export const UNIT_KEY_FACTORY = {
  all: ['unit'] as const,
  lists: () => [...UNIT_KEY_FACTORY.all, 'list'] as const,
  details: () => [...UNIT_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...UNIT_KEY_FACTORY.details(), id] as const,

  // Lesson related keys
  lessons: (unitId: string) => [...UNIT_KEY_FACTORY.all, 'lessons', unitId] as const,
  lesson: (lessonId: string) => [...UNIT_KEY_FACTORY.all, 'lesson', lessonId] as const,
  lessonNote: (lessonId: string) => [...UNIT_KEY_FACTORY.lesson(lessonId), 'note'] as const,

  // Learning related key
  learn: (unitId: string) => [...UNIT_KEY_FACTORY.all, 'learn', unitId] as const,
  learnLesson: (lessonId: string) => [...UNIT_KEY_FACTORY.lesson(lessonId), 'learn'] as const,

  // other keys
  note: (id: string) => [...UNIT_KEY_FACTORY.details(), id, 'note'] as const
}

// Example key results:
// all: ['unit']
// lists: ['unit', 'list']
// detail(123): ['unit', 'detail', '123']
// lessons(123): ['unit', 'lessons', '123']
// lesson(123, 456): ['unit', 'lesson', '123', '456']
// lessonNote(123, 456): ['unit', 'lesson', '123', '456', 'note']
// learn(123): ['unit', 'learn', '123']
// learnLesson(123, 456): ['unit', 'learn', '123', '456']
