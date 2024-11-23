import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { AppButton } from '~/components/common/AppButton'
import CreateEssayForm from '~/features/essay/components/CreateEssayForm'
import EssayPreview from '~/features/essay/view/EssayPreview'
import FloatingVocabButton from '~/features/vocabulary/components/FloatingVocabButton'
import { RootState } from '~/store/store'

enum ViewMode {
  EDIT_AND_HIDE_SIDEBAR = 'edit_and_hide_sidebar',
  EDIT_AND_SHOW_SIDEBAR = 'edit_and_show_sidebar',
  PREVIEW_AND_HIDE_SIDEBAR = 'preview_and_hide_sidebar',
  PREVIEW_AND_SHOW_SIDEBAR = 'preview_and_show_sidebar'
}

const EssayCreateView: React.FC = () => {
  const { essayFormData } = useSelector((state: RootState) => state.essay)
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EDIT_AND_HIDE_SIDEBAR)

  const togglePreview = () => {
    setViewMode((currentMode) => {
      switch (currentMode) {
        case ViewMode.EDIT_AND_SHOW_SIDEBAR:
          return ViewMode.PREVIEW_AND_SHOW_SIDEBAR
        case ViewMode.EDIT_AND_HIDE_SIDEBAR:
          return ViewMode.PREVIEW_AND_HIDE_SIDEBAR
        case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
          return ViewMode.EDIT_AND_SHOW_SIDEBAR
        case ViewMode.PREVIEW_AND_HIDE_SIDEBAR:
          return ViewMode.EDIT_AND_HIDE_SIDEBAR
        default:
          return currentMode
      }
    })
  }

  const toggleSidebar = () => {
    setViewMode((currentMode) => {
      switch (currentMode) {
        case ViewMode.EDIT_AND_SHOW_SIDEBAR:
          return ViewMode.EDIT_AND_HIDE_SIDEBAR
        case ViewMode.EDIT_AND_HIDE_SIDEBAR:
          return ViewMode.EDIT_AND_SHOW_SIDEBAR
        case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
          return ViewMode.PREVIEW_AND_HIDE_SIDEBAR
        case ViewMode.PREVIEW_AND_HIDE_SIDEBAR:
          return ViewMode.PREVIEW_AND_SHOW_SIDEBAR
        default:
          return currentMode
      }
    })
  }

  const renderMainContent = () => {
    switch (viewMode) {
      case ViewMode.EDIT_AND_HIDE_SIDEBAR:
      case ViewMode.EDIT_AND_SHOW_SIDEBAR:
        return <CreateEssayForm />
      case ViewMode.PREVIEW_AND_HIDE_SIDEBAR:
      case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
        return essayFormData ? <EssayPreview data={essayFormData as any} /> : null
      default:
        return null
    }
  }

  const renderSidebar = () => {
    switch (viewMode) {
      case ViewMode.EDIT_AND_SHOW_SIDEBAR:
      case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
        return (
          <Grid item xs={12} md={4}>
            {/* <VocabTabView /> */}
          </Grid>
        )
      default:
        return null
    }
  }

  const renderMainGridWidth = () => {
    switch (viewMode) {
      case ViewMode.EDIT_AND_HIDE_SIDEBAR:
      case ViewMode.PREVIEW_AND_HIDE_SIDEBAR:
        return 12
      case ViewMode.EDIT_AND_SHOW_SIDEBAR:
      case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
        return 8
      default:
        return 12
    }
  }

  const renderActionButtons = () => {
    switch (viewMode) {
      case ViewMode.PREVIEW_AND_HIDE_SIDEBAR:
      case ViewMode.PREVIEW_AND_SHOW_SIDEBAR:
        return (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <AppButton onClick={toggleSidebar}>
              {viewMode === ViewMode.PREVIEW_AND_HIDE_SIDEBAR ? 'Show sidebar' : 'Hide sidebar'}
            </AppButton>
            <AppButton onClick={togglePreview}>Back to Edit</AppButton>
          </Box>
        )
      case ViewMode.EDIT_AND_HIDE_SIDEBAR:
      case ViewMode.EDIT_AND_SHOW_SIDEBAR:
        return (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <AppButton onClick={toggleSidebar}>
              {viewMode === ViewMode.EDIT_AND_HIDE_SIDEBAR ? 'Show sidebar' : 'Hide sidebar'}
            </AppButton>
            <AppButton onClick={togglePreview}>Preview</AppButton>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={renderMainGridWidth()}>
          {renderMainContent()}
        </Grid>
        {renderSidebar()}
      </Grid>
      {renderActionButtons()}
      <FloatingVocabButton />
    </Box>
  )
}

export default React.memo(EssayCreateView)
