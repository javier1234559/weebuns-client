import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { UserRoundPen } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import { useEssay } from '~/features/essay/hooks/useEssayQueries'
import EssayDetailContent from '~/features/essay/view/EssayDetailContent'
import EssayDetailCorrect from '~/features/essay/view/EssayDetailCorrect'

function EssayDetailView() {
  const { id } = useParams()
  const [isCorrect, setIsCorrect] = useState(false)
  const { data, isLoading, isError, error } = useEssay(id as string)

  const handleCorrectEssay = () => {
    setIsCorrect(!isCorrect)
  }

  if (isLoading)
    return (
      <Grid item xs={12} md={8}>
        <AppLoading />
      </Grid>
    )

  if (isError) {
    return <AppError message={error?.message || 'Something went wrong'} />
  }

  if (!data) {
    return <AppError message='Data not found' />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', p: 2 }}>
          <Container>
            {isCorrect ? <EssayDetailCorrect data={data} /> : <EssayDetailContent data={data} />}
            <Box mr='auto'>
              <AppButton
                variant='black'
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center'
                }}
                onClick={handleCorrectEssay}
              >
                <UserRoundPen size={14} /> Correct this essay
              </AppButton>
            </Box>
          </Container>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EssayDetailView
