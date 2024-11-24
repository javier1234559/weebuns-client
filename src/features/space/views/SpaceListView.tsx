import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import PaginationUrl from '~/components/feature/PaginationUrl'
import LearningSpaceCard from '~/features/space/components/LearningSpaceCard'
import { useSpacesByUser } from '~/features/space/hooks/useSpaceQueries'
import usePagination from '~/hooks/usePagination'
import { RootState } from '~/store/store'

function SpaceListView() {
  const idCurrentUser = useSelector((state: RootState) => state.auth.id)
  const { page, perPage, updateQueryParams } = usePagination({ defaultPage: 1, defaultPerPage: 4 })
  const { data, error, loading } = useSpacesByUser(
    {
      page,
      perPage
    },
    idCurrentUser
  )
  const listSpaceData = data?.getUserSpaces

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  if (loading)
    return (
      <Grid item xs={12} md={8}>
        <AppLoading />
      </Grid>
    )

  if (!listSpaceData || error) {
    return <AppError error={error} />
  }

  return (
    <div>
      <Grid container spacing={2}>
        {listSpaceData.data.map((learningSpace) => (
          <Grid
            item
            key={learningSpace.id}
            xs={12}
            sm={12}
            md={5}
            lg={3}
            xl={2}
            sx={{
              display: 'flex',
              mr: { lg: '0.8rem' },

              height: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                flex: 1,
                gap: 3,
                height: '100%'
              }}
            >
              <LearningSpaceCard data={learningSpace} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <PaginationUrl
          currentPage={listSpaceData.pagination.currentPage}
          totalPages={listSpaceData.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        />
      </Box>
    </div>
  )
}

SpaceListView.displayName = 'SpaceListView'
export default SpaceListView
