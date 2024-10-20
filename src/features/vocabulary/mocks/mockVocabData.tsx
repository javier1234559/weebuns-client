import { VocabItem } from '~/features/vocabulary/vocab.type'

export const mockVocabData: VocabItem[] = [
  {
    word: 'Wandern',
    meaning: 'Hiking',
    audioUrl: '/audio/wandern.mp3',
    example: 'Wir gehen am Wochenende wandern.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'Reden, Reden über',
    meaning: 'Talk, talk about',
    audioUrl: '/audio/reden.mp3',
    example: 'Lass uns über das Projekt reden.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'Entspannen',
    meaning: 'Relax',
    audioUrl: '/audio/entspannen.mp3',
    example: 'Nach der Arbeit möchte ich mich entspannen.',
    tags: ['learned', 'activity'],
    createdDate: 'May 01, 2019 10:46 AM'
  },
  {
    word: 'rosa',
    meaning: 'pink color',
    audioUrl: '/audio/rosa.mp3',
    example: 'Das Kleid ist rosa.',
    tags: ['learned', 'color'],
    createdDate: 'May 01, 2019 10:46 AM'
  }
  // Add more mock data as needed
]
