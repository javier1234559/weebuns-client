import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useCallback, useState } from 'react'

import AudioButton from '~/features/vocabulary/components/AudioButton'
import LevelButtons from '~/features/vocabulary/components/LevelButtons'
import VocabQuiz from '~/features/vocabulary/components/VocabQuiz'
import { Vocabulary } from '~/features/vocabulary/mocks/MOCK_VOCABULARIES'

const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.4s ease'
  }
}))

const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%'
}))

const ExampleText = styled(Box)(({ theme }) => ({
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  width: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const ShowMoreButton = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  cursor: 'pointer',
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%',
  '&:hover': {
    '& .show-more-text': {
      color: theme.palette.primary.main
    }
  }
}))

const CONTENT_HEIGHT = {
  mobile: 350,
  desktop: 400
}

const CardContainer = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  padding: theme.spacing(3),
  height: '100%',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  WebkitTapHighlightColor: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  '&:focus': {
    outline: 'none'
  }
}))

const CardContent = styled(Box)<{ $isExpanded?: boolean }>(({ theme, $isExpanded }) => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    maxHeight: $isExpanded ? '100%' : `${CONTENT_HEIGHT.mobile}px`
  },
  [theme.breakpoints.up('sm')]: {
    maxHeight: $isExpanded ? '100%' : `${CONTENT_HEIGHT.desktop}px`
  },
  overflow: $isExpanded ? 'auto' : 'hidden',
  transition: 'max-height 0.3s ease',
  paddingBottom: '40px',
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400],
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[600]
    }
  }
}))

function QuizModal({ data }: { data: Vocabulary[] }) {
  const [progress, setProgress] = useState(0)
  const [showFrontContent, setShowFrontContent] = useState(false)
  const [showBackContent, setShowBackContent] = useState(false)
  const totalWords = data.length
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleCardChange = useCallback(
    (_id: string, index: number) => {
      const progressPercentage = (index / totalWords) * 100
      setProgress(progressPercentage)
      // Reset cả hai state khi chuyển card
      setShowFrontContent(false)
      setShowBackContent(false)
    },
    [totalWords]
  )

  const toggleShowFront = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFrontContent(!showFrontContent)
  }

  const toggleShowBack = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowBackContent(!showBackContent)
  }

  const processedData = data.map((vocab, index) => ({
    id: index,
    frontHTML: (
      <CardContainer>
        <CardContent $isExpanded={showFrontContent}>
          <Stack spacing={3} alignItems='center' width='100%'>
            {/* Term Section */}
            <Stack direction='row' alignItems='center' spacing={1}>
              <Typography
                variant='h6'
                color={theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary'}
                sx={{ fontWeight: 500 }}
              >
                {vocab.term}
              </Typography>
              <AudioButton text={vocab.term} />
            </Stack>

            {/* Image Section */}
            {vocab.imageUrl && (
              <Box
                component='img'
                src={vocab.imageUrl}
                alt={vocab.term}
                sx={{
                  maxWidth: '100%',
                  maxHeight: isMobile ? '150px' : '200px',
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
            )}

            {/* Example Section */}
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

            {/* Tags Section */}
            {vocab.tags.length > 0 && (
              <Box>
                <TagsContainer>
                  {vocab.tags.map((tag) => (
                    <Chip key={tag} label={tag} size='small' variant='outlined' sx={{ m: 0.5 }} />
                  ))}
                </TagsContainer>
              </Box>
            )}
          </Stack>
        </CardContent>
        <ShowMoreButton onClick={toggleShowFront}>
          <Typography variant='button' color='text.secondary' align='center' className='show-more-text'>
            {showFrontContent ? 'Show less' : 'Show more'}
          </Typography>
        </ShowMoreButton>
      </CardContainer>
    ),
    backHTML: (
      <CardContainer>
        <CardContent $isExpanded={showBackContent}>
          <Stack spacing={2} width='100%' alignItems='stretch'>
            {vocab.meaning.map((mean, idx) => (
              <Box
                key={idx}
                sx={{
                  borderRadius: 2,
                  p: 2
                }}
              >
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Typography
                    variant='body1'
                    color={theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary'}
                    sx={{ flex: 1, textAlign: 'left' }}
                  >
                    {mean}
                  </Typography>
                  <AudioButton text={mean} size='small' />
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
        <ShowMoreButton onClick={toggleShowBack}>
          <Typography variant='button' color='text.secondary' className='show-more-text'>
            {showBackContent ? 'Show less' : 'Show more'}
          </Typography>
        </ShowMoreButton>
        <ButtonContainer>
          <LevelButtons id={vocab.id} level={vocab.repetitionLevel} isHideDelete />
        </ButtonContainer>
      </CardContainer>
    )
  }))

  return (
    <Box
      sx={{
        mx: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        px: { xs: 2, sm: 6 },
        pb: 2
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 3,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant='h5' fontWeight='bold' gutterBottom>
          Review Vocab
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          There are {totalWords} words to review in this session.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Typography variant='subtitle2' color='text.secondary'>
              Session Progress
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              {Math.round(progress)}%
            </Typography>
          </Stack>
          <StyledProgressBar variant='determinate' value={progress} />
        </Box>
      </Box>

      {/* Quiz Section */}
      <VocabQuiz data={processedData} onCardChange={handleCardChange} />
    </Box>
  )
}

export default QuizModal
