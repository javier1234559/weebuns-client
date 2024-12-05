import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { KeyboardEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppInput } from '~/components/common/AppInput'
import AudioButton from '~/features/vocabulary/components/AudioButton'
import { useVocabularies } from '~/features/vocabulary/hooks/useVocabularyQueries'
import { RootState } from '~/store/store'

const ExampleText = styled(Box)(({ theme }) => ({
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginTop: theme.spacing(1),
  width: '100%'
}))

const SavedVocabSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const spaceId = useSelector((state: RootState) => state.space.currentSpace?.id)

  const { data: vocabularies, isLoading } = useVocabularies({ search: searchTerm, ...(spaceId ? { spaceId } : {}) })

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue)
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
          placeholder='Search saved words and press Enter'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        vocabularies?.data?.map((vocab) => (
          <Accordion key={vocab.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction='row' alignItems='center' spacing={1} py={1.5}>
                <AudioButton text={vocab.term} size='small' />
                <Typography>{vocab.term}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {vocab.imageUrl && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <img src={vocab.imageUrl} alt={vocab.term} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              )}
              {vocab.meaning.map((mean, index) => (
                <Typography key={index} variant='body2'>
                  • {mean}
                </Typography>
              ))}
              {vocab.exampleSentence && (
                <ExampleText>
                  <Stack direction='row' alignItems='center' spacing={1} py={1.5}>
                    <AudioButton text={vocab.exampleSentence} size='small' />
                    <Typography variant='body2' color='text.secondary'>
                      &quot;{vocab.exampleSentence}&quot;
                    </Typography>
                  </Stack>
                </ExampleText>
              )}
              {vocab.referenceLink && (
                <Typography variant='caption'>
                  Source:{' '}
                  <a href={vocab.referenceLink} target='_blank' rel='noopener noreferrer'>
                    {vocab.referenceLink}
                  </a>
                  <span>{vocab.referenceName}</span>
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      )}
      {vocabularies?.data?.length === 0 && (
        <Typography py={2} align='center'>
          No words found
        </Typography>
      )}
    </Box>
  )
}

export default SavedVocabSearch
