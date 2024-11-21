import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

import AppError from '~/components/common/AppError'
import PaginationUrl from '~/components/feature/PaginationUrl'
import CourseCard from '~/features/course/components/CourseCard'
import CourseCardSkeleton from '~/features/course/components/CourseCardSekeleton'
import { useCourseJoined } from '~/features/course/hooks/useCourseQueries'
import usePagination from '~/hooks/usePagination'
import { RootState } from '~/store/store'

export const CourseLoadingState = ({ count = 10 }) => (
  <Grid container spacing={2}>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <Grid
          item
          key={`skeleton-${index}`}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: 'flex',
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
            <CourseCardSkeleton />
          </Box>
        </Grid>
      ))}
  </Grid>
)

function MyCourseListView() {
  const idCurrenSpace = useSelector((state: RootState) => state.space.currentSpace?.id)
  const { page, perPage, updateQueryParams } = usePagination({ defaultPage: 1, defaultPerPage: 4 })
  const { data, error, isLoading } = useCourseJoined(idCurrenSpace || '', {
    page,
    perPage
  })

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  if (isLoading) {
    return <CourseLoadingState count={perPage} />
  }

  if (!data || error) {
    return <AppError message={error?.message || 'Something went wrong'} />
  }

  return (
    <div>
      <Grid container spacing={2}>
        {data.data.map((item) => (
          <Grid
            item
            key={`${item.id}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: 'flex',
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
              <CourseCard data={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <PaginationUrl
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        />
      </Box>
    </div>
  )
}

MyCourseListView.displayName = 'MyCourseListView'
export default MyCourseListView
