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
import ScrollToTopButton from '~/components/feature/ScrollToTopButton'
import { ModalProvider } from '~/contexts/ModalContext'
import { useGetExistingCorrectedByEssay } from '~/features/essay/hooks/useCorrectQueries'
import { useEssay } from '~/features/essay/hooks/useEssayQueries'
import EssayCorrectionHistory from '~/features/essay/view/EssayCorrectionHistory'
import EssayDetailContent from '~/features/essay/view/EssayDetailContent'
import EssayDetailCreateCorrect from '~/features/essay/view/EssayDetailCreateCorrect'
import EssayDetailUpdateCorrect from '~/features/essay/view/EssayDetailUpdateCorrect'

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

  const handleCreateCorrection = async () => {
    setCorrectionMode(CorrectionModes.VIEW)
  }

  if (isLoading) return <AppLoading />
  if (!data || isError) return <AppError error={error} />

  const renderContent = () => {
    switch (correctionMode) {
      case CorrectionModes.VIEW:
        return <EssayDetailContent data={data} />
      case CorrectionModes.CREATE:
        return (
          <EssayDetailCreateCorrect onSubmit={handleCreateCorrection} onExit={handleToggleCorrection} data={data} />
        )
      case CorrectionModes.UPDATE:
        return existingCorrection ? (
          <EssayDetailUpdateCorrect
            data={existingCorrection}
            onSubmit={handleCreateCorrection}
            onExit={handleToggleCorrection}
            essayData={data}
          />
        ) : null
      default:
        return <EssayDetailContent data={data} />
    }
  }

  return (
    <ModalProvider>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', p: 2 }}>
            <Container>
              {renderContent()}
              {CorrectionModes.VIEW === correctionMode && (
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
              )}
            </Container>
          </Card>
          {CorrectionModes.VIEW === correctionMode && (
            <Box mt={4}>
              <Typography variant='h5' component='h2' mb={2}>
                Correction History
              </Typography>
              <EssayCorrectionHistory idEssay={data.essay.id} />
            </Box>
          )}
        </Grid>
      </Grid>
      <ScrollToTopButton
        threshold={300}
        color='primary' // Will only accept valid MUI colors
        size='medium' // Will only accept "small" | "medium" | "large"
      />
    </ModalProvider>
  )
}
EssayDetailView.displayName = 'EssayDetailView'
export default EssayDetailView
