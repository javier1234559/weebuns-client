import Search from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import AppError from '~/components/common/AppError'
import PaginationUrl from '~/components/feature/PaginationUrl'
import CourseCardExplore from '~/features/course/components/CourseCardExplore'
import MegaFilterCourse from '~/features/course/components/MegaFilterCourse'
import { useCoursesExplore } from '~/features/course/hooks/useCourseQueries'
import { CourseLoadingState } from '~/features/course/view/MyCourseListView'
import usePagination from '~/hooks/usePagination'
import { RootState } from '~/store/store'

const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setParam = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)
  }

  return {
    params: {
      search: searchParams.get('search') || '',
      language: searchParams.get('language') || '',
      minLevel: searchParams.get('minLevel') || '',
      maxLevel: searchParams.get('maxLevel') || '',
      courseType: searchParams.get('type') || '',
      topics: searchParams.get('topics')?.split(',') || []
    },
    setParam
  }
}

const CourseExploreLoadingState = ({ count = 10 }) => (
  <Container maxWidth='lg' sx={{ py: 4 }}>
    <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
      <Skeleton variant='rectangular' sx={{ flex: 1, borderRadius: '16px' }} height={60} />
      <Skeleton variant='rectangular' sx={{ borderRadius: '16px' }} width={50} height={60} />
    </Box>
    <CourseLoadingState count={count} />
  </Container>
)

const CourseExploreView = () => {
  const { params, setParam } = useUrlParams()
  const spaceId = useSelector((state: RootState) => state.space.currentSpace?.id) || ''
  const { search, searchParam, setSearch, page, perPage, updateQueryParams } = usePagination({
    defaultPage: 1,
    defaultPerPage: 10,
    debounceDelay: 1000
  })

  const {
    data: courses,
    isLoading,
    error
  } = useCoursesExplore(spaceId, {
    page,
    perPage,
    search: searchParam
  })

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (isLoading) return <CourseExploreLoadingState count={perPage} />
  if (!courses || error) return <AppError message={error?.message || 'Error occur'} />

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder='Search courses...'
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            )
          }}
        />
        <MegaFilterCourse params={params} setParam={setParam} />
      </Box>

      <Grid container spacing={3}>
        {!isLoading &&
          courses?.data?.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCardExplore data={course} />
            </Grid>
          ))}
      </Grid>

      <Box mt={4}>
        <PaginationUrl
          currentPage={courses.pagination.currentPage}
          totalPages={courses.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        />
      </Box>
    </Container>
  )
}

export default CourseExploreView
