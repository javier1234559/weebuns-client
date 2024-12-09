import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/common/AppButton'
import AppInput from '~/components/common/AppInput'
import AppLoading from '~/components/common/AppLoading'
import { CardContent } from '~/components/ui/card'

import { useSentenceSearch } from '../hooks/useSentenceSearch'

const SentenceSearch = () => {
  const { searchTerm, setSearchTerm, results, isLoading, error, handleSearch, formatText } = useSentenceSearch()

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Sentence Search
        </Typography>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <AppInput
            fullWidth
            rows={2}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder='Enter a sentence in English or Vietnamese'
          />
          <AppButton variant='contained' onClick={handleSearch} sx={{ ml: 1 }}>
            Search
          </AppButton>
        </Box>

        {isLoading && <AppLoading />}
        {error && <Typography color='error'>{error.message}</Typography>}

        {results?.map((result, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='subtitle1' dangerouslySetInnerHTML={formatText(result.fields.vi)} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant='body2'
                color='text.secondary'
                dangerouslySetInnerHTML={formatText(result.fields.en)}
                sx={{ mb: 2 }}
              />
              {result.fields.tag && (
                <Box sx={{ mt: 1 }}>
                  {result.fields.tag.map((tag) => (
                    <Chip key={tag} label={tag} size='small' sx={{ mr: 0.5 }} />
                  ))}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Box>
  )
}

export default SentenceSearch
