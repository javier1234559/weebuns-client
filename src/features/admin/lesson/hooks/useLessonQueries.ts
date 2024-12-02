import { useQuery } from '@tanstack/react-query'

import { LESSON_KEY_FACTORY } from '~/features/admin/lesson/hooks/lesson-key-factory'
import lessonApi from '~/features/admin/lesson/services/lessonApi'

export const useGetLessonById = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: LESSON_KEY_FACTORY.detail(id),
    queryFn: () => lessonApi.getById(id),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}
