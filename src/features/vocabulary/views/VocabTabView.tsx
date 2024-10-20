import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useState } from 'react'

import { CardTitle } from '~/components/ui/card'
import DictionarySearch from '~/features/vocabulary/components/DictionarySearch'
import SavedVocabSearch from '~/features/vocabulary/components/SavedVocabSearch'
import VocabForm from '~/features/vocabulary/components/VocabForm'

function VocabTabView() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const contentTabs = [
    {
      label: 'Dictionary',
      content: <DictionarySearch />
    },
    {
      label: 'Add',
      content: <VocabForm />
    },
    {
      label: 'Saved',
      content: <SavedVocabSearch />
    }
  ]

  return (
    <Card>
      <CardContent>
        <CardTitle
          sx={{
            marginBottom: 1
          }}
        >
          Vocab Tabs Form
        </CardTitle>
        <Tabs value={value} onChange={handleChange} centered>
          {contentTabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
        <Box p={1}>{contentTabs[value].content}</Box>
      </CardContent>
    </Card>
  )
}

VocabTabView.displayName = 'VocabTabView'
export default VocabTabView
