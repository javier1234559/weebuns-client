import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { memo } from 'react'
import { useSearchParams } from 'react-router-dom'

import CompleteProgressButton from '~/features/course/components/CompleteProgressButton'
import { useContentNavigation } from '~/features/course/hooks/useContentNavigation'
import { UnitContent } from '~/services/api/api-axios'

interface UnitContentTabsProps {
  contents: UnitContent[]
}

const TheoryContent = ({ content }: { content: UnitContent['content'] }) => (
  <Box sx={{ p: 3 }}>
    <pre>{JSON.stringify(content, null, 2)}</pre>
  </Box>
)

const ExerciseContent = ({ content }: { content: UnitContent['content'] }) => (
  <Box sx={{ p: 3 }}>
    <pre>{JSON.stringify(content, null, 2)}</pre>
  </Box>
)

const ContentTypeMap = {
  theory: TheoryContent,
  exercise: ExerciseContent
}

const UnitContentTabs = ({ contents }: UnitContentTabsProps) => {
  const navigation = useContentNavigation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentContentId = searchParams.get('unitContentId')

  const activeTabIndex = contents.findIndex((content) => content.id === currentContentId)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const newContentId = contents[newValue].id
    setSearchParams((prev) => {
      prev.set('unitContentId', newContentId)
      return prev
    })
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex === -1 ? 0 : activeTabIndex} onChange={handleTabChange}>
          {contents.map((content) => (
            <Tab
              key={content.id}
              label={content.title}
              id={`content-tab-${content.id}`}
              aria-controls={`content-tabpanel-${content.id}`}
            />
          ))}
        </Tabs>
      </Box>

      {contents.map((content, index) => {
        const isActive = activeTabIndex === index || (activeTabIndex === -1 && index === 0)
        const ContentComponent = ContentTypeMap[content.contentType]

        return (
          <Box
            key={content.id}
            role='tabpanel'
            hidden={!isActive}
            id={`content-tabpanel-${content.id}`}
            aria-labelledby={`content-tab-${content.id}`}
          >
            {isActive && ContentComponent && (
              <Box>
                <ContentComponent content={content.content} />
                <CompleteProgressButton
                  content={content}
                  nextContent={navigation.nextContent}
                  nextUnit={navigation.nextUnit}
                  isLastContent={navigation.isLastContent}
                />
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

UnitContentTabs.displayName = 'UnitContentTabs'
export default memo(UnitContentTabs)
