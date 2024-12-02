import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useMemo, useState } from 'react'

import WaveAudio from '~/components/feature/WaveAudio'
import { DictationContent } from '~/features/lesson/lesson.type'

import DictationPractice from './DictationPractice'

interface DictationViewerProps {
  content: DictationContent
}

function DictationViewer({ content }: DictationViewerProps) {
  const [currentTab, setCurrentTab] = useState(0)

  const contentTabs = useMemo(
    () => [
      {
        label: 'Content',
        content: <Box className='ql-editor' dangerouslySetInnerHTML={{ __html: content.text }} />
      },
      {
        label: 'Practice',
        content: <DictationPractice originalText={content.text} />
      }
    ],
    [content]
  )

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <Box>
      <WaveAudio audioUrl={content.audioUrl} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {contentTabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ py: 2 }}>{contentTabs[currentTab].content}</Box>
    </Box>
  )
}

export default DictationViewer
