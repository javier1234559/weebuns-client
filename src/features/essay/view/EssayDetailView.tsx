import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { UserRoundPen } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import { useGetExistingCorrectedByEssay } from '~/features/essay/hooks/useCorrectQueries'
import { useEssay } from '~/features/essay/hooks/useEssayQueries'
import EssayCorrectionHistory from '~/features/essay/view/EssayCorrectionHistory'
import EssayDetailContent from '~/features/essay/view/EssayDetailContent'
import EssayDetailCorrect from '~/features/essay/view/EssayDetailCorrect'
import { CreateCorrectionDto } from '~/services/graphql/graphql'

const CorrectionModes = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE'
} as const

type CorrectionMode = (typeof CorrectionModes)[keyof typeof CorrectionModes]
function EssayDetailView() {
  const { id } = useParams()
  const [correctionMode, setCorrectionMode] = useState<CorrectionMode>(CorrectionModes.VIEW)

  const { data, isLoading, isError, error } = useEssay(id as string)
  const { data: correctionData } = useGetExistingCorrectedByEssay(data?.essay.id ?? '')

  const existingCorrection = correctionData?.getCorrectionIfExist

  const handleToggleCorrection = () => {
    if (correctionMode == CorrectionModes.VIEW) {
      const editingMode = existingCorrection ? CorrectionModes.UPDATE : CorrectionModes.CREATE
      setCorrectionMode(editingMode)
    } else {
      setCorrectionMode(CorrectionModes.VIEW)
    }
  }

  const handleCreateCorrection = (data: CreateCorrectionDto) => {
    console.log(data)
    setCorrectionMode(CorrectionModes.VIEW)
  }

  if (isLoading) return <AppLoading />
  if (isError) return <AppError message={error?.message || 'Something went wrong'} />
  if (!data) return <AppError message='Data not found' />

  const renderContent = () => {
    switch (correctionMode) {
      case CorrectionModes.VIEW:
        return <EssayDetailContent data={data} />
      case CorrectionModes.CREATE:
        return <EssayDetailCorrect onSubmit={handleCreateCorrection} data={data} />
      case CorrectionModes.UPDATE:
        return <h1>update</h1>
      default:
        return <EssayDetailContent data={data} />
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', p: 2 }}>
          <Container>
            {renderContent()}
            <Box mr='auto'>
              <AppButton
                variant='black'
                sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                onClick={handleToggleCorrection}
              >
                <UserRoundPen size={14} />
                {existingCorrection ? 'Update Correction' : 'Correct this essay'}
              </AppButton>
            </Box>
          </Container>
        </Card>
        <Box mt={4}>
          <Typography variant='h5' component='h2' mb={2}>
            Correction History
          </Typography>
          <EssayCorrectionHistory idEssay={data.essay.id} />
        </Box>
      </Grid>
    </Grid>
  )
}
EssayDetailView.displayName = 'EssayDetailView'
export default EssayDetailView
