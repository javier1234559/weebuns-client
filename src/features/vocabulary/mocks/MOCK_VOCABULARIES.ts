export interface Vocabulary {
  id: string
  term: string
  meaning: string[]
  exampleSentence?: string
  imageUrl?: string
  referenceLink?: string
  referenceName?: string
  tags: string[]
  repetitionLevel: number
  nextReview?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export const MOCK_VOCABULARIES: Vocabulary[] = [
  {
    id: '1',
    term: 'blueprint',
    meaning: [
      'something intended as a guide for making something',
      'bản thiết kế',
      'something intended as a guide for making something',
      'desgin plan',
      'something intended as a guide for making something'
    ],
    exampleSentence: 'talked about building a blueprint for success, citing the...',
    imageUrl: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&h=350',
    tags: ['blue', 'Noun'],
    repetitionLevel: 4,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    term: 'blossomed',
    meaning: ['nở rộ', 'developed into'],
    exampleSentence: 'blossomed into this larger thing',
    tags: ['indicative', 'past', 'to blossom', 'Verb'],
    repetitionLevel: 2,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    term: 'case',
    meaning: ['case', 'trường hợp'],
    exampleSentence: 'out to be the case',
    tags: ['Noun', 'present', 'Verb'],
    repetitionLevel: 1,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    term: 'counselling',
    meaning: ['consulting, advising', 'tư vấn'],
    exampleSentence: 'that pays, said Godin, counselling the diverse crowd of...',
    tags: ['Noun', 'present continuous', 'to counsel', 'Verb'],
    repetitionLevel: 3,
    createdBy: 'user1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
