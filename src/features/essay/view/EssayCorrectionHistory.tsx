import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import PaginationUrl from '~/components/feature/PaginationUrl'
import { Card } from '~/components/ui/card'
import CorrectionCard from '~/features/essay/components/CorrectionCard'
import { useListCorrectedByEssay } from '~/features/essay/hooks/useCorrectQueries'
import usePagination from '~/hooks/usePagination'

interface EssayCorrectionHistoryProps {
  idEssay: string
}

function EssayCorrectionHistory({ idEssay }: EssayCorrectionHistoryProps) {
  const { page, perPage, updateQueryParams } = usePagination({ defaultPage: 1, defaultPerPage: 2 })
  const { data, error, loading } = useListCorrectedByEssay(
    {
      page,
      perPage
    },
    idEssay
  )
  const correctionList = data?.getCorrectionsByEssay

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  if (loading)
    return (
      <Grid item xs={12} md={8}>
        <AppLoading />
      </Grid>
    )

  if (!correctionList || error) {
    return <AppError message={error?.message || 'Something went wrong'} />
  }
  const isEmpty = correctionList.data.length === 0

  return (
    <>
      {isEmpty && (
        <Card
          sx={{
            p: 2
          }}
        >
          <Typography variant='subtitle2' color='text.secondary' textAlign='center' py={2}>
            No correction history
          </Typography>
        </Card>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {correctionList.data.map((item) => (
          <CorrectionCard key={item.id} item={item} />
        ))}
      </Box>

      {!isEmpty && (
        <Box mt={4}>
          <PaginationUrl
            currentPage={correctionList.pagination.currentPage}
            totalPages={correctionList.pagination.totalPages}
            onPageChange={handlePageChange}
            variant='outlined'
            color='primary'
            size='large'
          />
        </Box>
      )}
    </>
  )
}

EssayCorrectionHistory.displayName = 'EssayCorrectionHistory'

export default EssayCorrectionHistory
