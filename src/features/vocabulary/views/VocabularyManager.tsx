import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useState } from 'react'

import PaginationUrl from '~/components/feature/PaginationUrl'
import TableVocab from '~/features/vocabulary/components/TableVocab'
import { MOCK_VOCABULARIES } from '~/features/vocabulary/mocks/MOCK_VOCABULARIES'

function VocabularyManager() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const contentTabs = [
    {
      label: 'All',
      content: <TableVocab vocabularies={MOCK_VOCABULARIES} />
    },
    // {
    //   label: 'Phrases',
    //   content: <TableVocab vocabularies={MOCK_VOCABULARIES} />
    // },
    {
      label: 'Due for Review(SRS)',
      content: <TableVocab vocabularies={MOCK_VOCABULARIES} />
    }
  ]

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
        {/* <PaginationUrl
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={handlePageChange}
          variant='outlined'
          color='primary'
          size='large'
        /> */}
      </Box>
    </Box>
  )
}

VocabularyManager.displayName = 'VocabularyManager'
export default VocabularyManager
