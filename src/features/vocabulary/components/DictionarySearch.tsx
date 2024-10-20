import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import React from 'react'

import AppButton from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import AppLink from '~/components/common/AppLink'
import AppLoading from '~/components/common/AppLoading'
import { useDictionarySearch } from '~/features/vocabulary/hooks/useDictionarySearch'
import { useImageSearch } from '~/features/vocabulary/hooks/useImageSearch'

const DictionarySearch: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    definitionData,
    isDefinitionLoading,
    isDefinitionError,
    definitionError,
    handleSearch
  } = useDictionarySearch()

  const { imageData, isImageLoading } = useImageSearch(debouncedSearchTerm)

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const playAudio = (audioUrl: string) => {
    new Audio(audioUrl).play()
  }

  return (
    <Box>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Dictionary
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <AppInput
            fullWidth
            variant='outlined'
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder='Enter a word'
          />
          <AppButton variant='contained' onClick={handleSearch} sx={{ ml: 1 }}>
            Search
          </AppButton>
        </Box>

        {(isDefinitionLoading || isImageLoading) && <AppLoading />}
        {isDefinitionError && <Typography color='error'>{definitionError?.message}</Typography>}
        {definitionData && definitionData[0] && (
          <Box>
            <Typography variant='h4'>{definitionData[0].word}</Typography>
            {definitionData[0].phonetics.map(
              (phonetic, index) =>
                phonetic.text &&
                phonetic.audio && (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant='subtitle1'>{phonetic.text}</Typography>
                    <IconButton onClick={() => playAudio(phonetic.audio)} size='small'>
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                )
            )}
            {imageData && (
              <Box sx={{ my: 2 }}>
                <img src={imageData.src.medium} alt={imageData.alt} style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant='caption'>
                  Photo by{' '}
                  <AppLink href={imageData.photographer_url} target='_blank' rel='noopener noreferrer'>
                    {imageData.photographer}
                  </AppLink>{' '}
                  on{' '}
                  <AppLink
                    href={`https://www.pexels.com/search/${encodeURIComponent(debouncedSearchTerm)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Pexels
                  </AppLink>
                </Typography>
              </Box>
            )}
            {definitionData[0].meanings.map((meaning, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subtitle2'>{meaning.partOfSpeech}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {meaning.definitions.map((def, i) => (
                    <Box key={i} sx={{ mb: 2, pl: 2 }}>
                      <Typography variant='body2'>
                        <span>{i + 1}.</span> {def.definition}
                      </Typography>
                      {def.example && (
                        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                          Example: <em>{def.example}</em>
                        </Typography>
                      )}
                      {def.synonyms.length > 0 && (
                        <Typography variant='body2' sx={{ mt: 0.5 }}>
                          Synonyms: {def.synonyms.join(', ')}
                        </Typography>
                      )}
                      {def.antonyms.length > 0 && (
                        <Typography variant='body2' sx={{ mt: 0.5 }}>
                          Antonyms: {def.antonyms.join(', ')}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Find this word on:</Typography>
          <AppLink
            href={`https://www.vocabulary.com/dictionary/${encodeURIComponent(searchTerm)}`}
            target='_blank'
            rel='noopener noreferrer'
            sx={{ mr: 1 }}
          >
            Vocabulary.com
          </AppLink>
          <AppLink
            href={`https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(searchTerm)}`}
            target='_blank'
            rel='noopener noreferrer'
            sx={{ mr: 1 }}
          >
            Cambridge Dictionary
          </AppLink>
          <AppLink
            href={`https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(searchTerm)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Oxford Dictionary
          </AppLink>
        </Box>
      </CardContent>
    </Box>
  )
}

DictionarySearch.displayName = 'DictionarySearch'

export default DictionarySearch
