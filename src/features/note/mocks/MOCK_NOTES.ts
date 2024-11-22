import { Note } from '~/services/api/api-axios'

export const MOCK_NOTES: Note[] = [
  {
    id: 'c4f4d169-951a-4c9c-8eaf-c780b87fcdf2',
    spaceId: '32333b28-e9aa-48a8-ba17-cf50fa196476',
    unitId: '1cc3b58b-3784-457a-bb32-696769dc6e78',
    title: 'JavaScript Event Loop',
    content:
      '<p>The <strong>event loop</strong> is a programming construct that waits for and dispatches events in a program.</p>',
    tags: { javascript: true, async: true },
    isBookmarked: true,
    createdBy: '351d1a37-09a6-4f94-88ae-70db051049ef',
    createdAt: '2024-11-21T18:46:38.118Z',
    updatedAt: '2024-11-21T18:46:38.118Z',
    deletedAt: null,
    unit: {
      id: '1cc3b58b-3784-457a-bb32-696769dc6e78',
      courseId: '494b1819-fc07-43db-aaf0-8ab777e63a59',
      title: 'Advanced JavaScript Concepts',
      description: 'Learn about advanced JavaScript concepts',
      orderIndex: 1,
      isPremium: false,
      unitWeight: 30,
      createdBy: '1d6e7124-411f-49a6-92bd-24cc7db1997c',
      createdAt: '2024-11-21T16:57:06.339Z',
      updatedAt: '2024-11-21T16:57:06.339Z'
    }
  }
]
