import { CourseUnitResponseDto } from '~/services/api/api-axios'

export const MOCK_UNIT_LIST: CourseUnitResponseDto = {
  data: [
    {
      id: '196cd93f-25fd-4878-97d3-7b3f3dc53bff',
      courseId: 'bd267506-ada5-486f-85d0-c42f52183b66',
      title: 'Present Tense Mastery',
      orderIndex: 1,
      isPremium: false,
      createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
      createdAt: '2024-11-29T15:42:54.631Z',
      updatedAt: '2024-11-29T15:42:54.631Z',
      lessons: [
        {
          id: '72cf0b37-beba-4244-b89b-e9b8e01c6903',
          title: 'Present Simple - Introduction',
          summary: 'Learn the basics of Present Simple tense',
          orderIndex: 1,
          isPremium: false,
          isRequired: true,
          status: 'published',
          createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
          createdAt: '2024-11-29T15:42:55.162Z',
          updatedAt: '2024-11-29T15:42:55.162Z',
          lessonWeight: 4,
          unitId: '196cd93f-25fd-4878-97d3-7b3f3dc53bff'
        },
        {
          id: '43ac8511-3b9b-4c47-9d8b-49dbe8fe198b',
          title: 'Present Continuous - Introduction',
          summary: 'Learn the basics of Present Continuous tense',
          orderIndex: 2,
          isPremium: false,
          isRequired: true,
          status: 'published',
          createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
          createdAt: '2024-11-29T15:42:55.467Z',
          updatedAt: '2024-11-29T15:42:55.467Z',
          lessonWeight: 6,
          unitId: '196cd93f-25fd-4878-97d3-7b3f3dc53bff'
        }
      ]
    },
    {
      id: 'f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2',
      courseId: 'bd267506-ada5-486f-85d0-c42f52183b66',
      title: 'Past Tense Mastery',
      orderIndex: 2,
      isPremium: false,
      createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
      createdAt: '2024-11-29T15:42:54.961Z',
      updatedAt: '2024-11-29T15:42:54.961Z',
      lessons: [
        {
          id: '2afc4bdc-8cf4-41f2-bd4c-45546bd8c8e0',
          title: 'Past Simple - Introduction',
          summary: 'Learn the basics of Past Simple tense',
          orderIndex: 1,
          isPremium: false,
          isRequired: true,
          status: 'published',
          createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
          createdAt: '2024-11-29T15:42:55.691Z',
          updatedAt: '2024-11-29T15:42:55.691Z',
          lessonWeight: 4,
          unitId: 'f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2'
        },
        {
          id: '2df916f6-4945-4ea0-ba3d-d3d78a9bbc55',
          title: 'Past Continuous - Introduction',
          summary: 'Learn the basics of Past Continuous tense',
          orderIndex: 2,
          isPremium: false,
          isRequired: true,
          status: 'published',
          createdBy: '94ea8ac7-b150-4a96-919d-67927b360ef7',
          createdAt: '2024-11-29T15:42:55.890Z',
          updatedAt: '2024-11-29T15:42:55.890Z',
          lessonWeight: 6,
          unitId: 'f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2'
        }
      ]
    }
  ],
  pagination: {
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  }
}
