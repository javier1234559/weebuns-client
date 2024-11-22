import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import AppError from '~/components/common/AppError'
import AppLoading from '~/components/common/AppLoading'
import PaginationUrl from '~/components/feature/PaginationUrl'
import TableVocab from '~/features/vocabulary/components/TableVocab'
import { useVocabularies } from '~/features/vocabulary/hooks/useVocabularyQueries'
import usePagination from '~/hooks/usePagination'
import { RootState } from '~/store/store'

function VocabularyManager() {
  const [value, setValue] = useState(0)
  const spaceId = useSelector((state: RootState) => state.space.currentSpace?.id) || ''
  const { search, page, perPage, updateQueryParams } = usePagination({
    defaultPage: 1,
    defaultPerPage: 10
  })

  const queryParams = useMemo(
    () => ({
      spaceId,
      search,
      page,
      perPage,
      ...(value === 1 ? { dueDate: true } : {})
    }),
    [spaceId, search, page, perPage, value]
  )

  const { data, isLoading, error } = useVocabularies(queryParams)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
    // Reset pagination when changing tabs
    if (page !== 1) {
      updateQueryParams({ page: 1 })
    }
  }

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  // Memoize contentTabs to prevent unnecessary re-renders
  const contentTabs = useMemo(
    () => [
      {
        label: 'All',
        content: <TableVocab vocabularies={data?.data || []} />
      },
      {
        label: 'Due for Review(SRS)',
        content: <TableVocab vocabularies={data?.data || []} />
      }
    ],
    [data?.data]
  ) // Only re-create when data.data changes

  if (isLoading) return <AppLoading />
  if (!data || error) return <AppError message={error?.message || 'No data found'} />

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={value} onChange={handleChange}>
          {contentTabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box p={1}>{contentTabs[value].content}</Box>
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
    </Box>
  )
}

VocabularyManager.displayName = 'VocabularyManager'
export default VocabularyManager
