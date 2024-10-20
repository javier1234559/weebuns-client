import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'

import { AppInput } from '~/components/common/AppInput'

interface SavedWord {
  id: string
  word: string
  phonetic: string
  audio: string
  meaning: string
  example: string
  picture: string
  sourceLink: string
}

const mockSavedWords: SavedWord[] = [
  {
    id: '1',
    word: 'Development',
    phonetic: 'dɪˈveləpmənt',
    audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/development-us.mp3',
    meaning: 'Phát triển',
    example: 'Development is the act of improving by expanding, enlarging, or refining. The merging of two university',
    picture: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
    sourceLink: 'https://www.vocabulary.com/dictionary/development'
  },
  {
    id: '2',
    word: 'Love',
    phonetic: 'lʌv',
    audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/love-uk.mp3',
    meaning: 'Tình cảm',
    example: 'Love is a profound and caring affection towards someone.',
    picture: 'https://images.pexels.com/photos/348520/pexels-photo-348520.jpeg?auto=compress&cs=tinysrgb&w=600',
    sourceLink: 'https://www.vocabulary.com/dictionary/love'
  }
]

const fetchSavedWords = async (searchTerm: string): Promise<SavedWord[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockSavedWords.filter((word) => word.word.toLowerCase().includes(searchTerm.toLowerCase()))
}

const SavedVocabSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { data: savedWords, isLoading } = useQuery<SavedWord[], Error>({
    queryKey: ['savedWords', searchTerm],
    queryFn: () => fetchSavedWords(searchTerm),
    initialData: mockSavedWords
  })

  const playAudio = (e: React.MouseEvent, audioUrl: string) => {
    e.stopPropagation()
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play().catch((error) => console.error('Audio playback failed:', error))
    }
  }

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Saved Words
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AppInput
          fullWidth
          variant='outlined'
          placeholder='Search saved words'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              endAdornment: <SearchIcon />
            }
          }}
        />
      </Box>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        savedWords.map((word) => (
          <Accordion key={word.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton onClick={(e) => playAudio(e, word.audio)} size='small'>
                  <VolumeUpIcon />
                </IconButton>
                <Typography>{word.word}</Typography>
                <Typography sx={{ ml: 1, color: 'text.secondary' }}>{word.phonetic}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='subtitle1'>Meaning: {word.meaning}</Typography>
              <Typography variant='body2'>
                <span>Example: </span>
                <em>{word.example}</em>
              </Typography>
              {word.picture && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <img src={word.picture} alt={word.word} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              )}
              <Typography variant='caption'>
                Source & reference link:{' '}
                <a href={word.sourceLink} target='_blank' rel='noopener noreferrer'>
                  {word.sourceLink}
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
      <audio ref={audioRef} />
    </Box>
  )
}

export default SavedVocabSearch
