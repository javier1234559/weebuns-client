export const COURSE_KEY_FACTORY = {
  all: ['course'] as const,
  lists: () => [...COURSE_KEY_FACTORY.all, 'list'] as const,
  list: (params: any) => [...COURSE_KEY_FACTORY.lists(), params] as const,
  joined: () => [...COURSE_KEY_FACTORY.lists(), 'joined'] as const,
  explore: () => [...COURSE_KEY_FACTORY.lists(), 'explore'] as const,
  details: () => [...COURSE_KEY_FACTORY.all, 'detail'] as const,
  detail: (id: string) => [...COURSE_KEY_FACTORY.details(), id] as const,
  units: (courseId: string) => [...COURSE_KEY_FACTORY.all, 'units', courseId] as const,
  learn: (courseId: string) => [...COURSE_KEY_FACTORY.all, 'learn', courseId] as const,
  join: () => [...COURSE_KEY_FACTORY.all, 'join'] as const,
  checkJoin: (courseId: string) => [...COURSE_KEY_FACTORY.join(), courseId] as const,
  progress: (courseId: string) => [...COURSE_KEY_FACTORY.all, 'progress', courseId] as const
}
