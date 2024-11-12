import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AppButton } from '~/components/common/AppButton'
import { ModalProvider } from '~/contexts/ModalContext'
import UpdateEssayForm from '~/features/essay/components/ViewOnlyEssayForm'
import { setEssayViewData } from '~/features/essay/essaySlice'
import { useEssay } from '~/features/essay/hooks/useEssayQueries'
import VocabTabView from '~/features/vocabulary/views/VocabTabView'
import { RouteNames } from '~/router/route-name'
import { replacePathId } from '~/utils/replace-path'

enum ViewMode {
  SHOW_SIDEBAR = 'show_sidebar',
  HIDE_SIDEBAR = 'hide_sidebar'
}

const EssayViewOnly: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SHOW_SIDEBAR)
  const dispatch = useDispatch()

  const { data: essayFormData } = useEssay(id as string)

  useEffect(() => {
    if (essayFormData) {
      dispatch(
        setEssayViewData({
          title: essayFormData.essay.title,
          content: essayFormData.essay.content,
          cover_url: essayFormData.essay.coverUrl,
          hashtags: essayFormData.essay.hashtags?.map((hashtag) => hashtag.hashtag?.name) || [],
          language: essayFormData.essay.language
        })
      )
    }
  }, [dispatch, essayFormData])

  const toggleSidebar = () => {
    setViewMode((currentMode) =>
      currentMode === ViewMode.SHOW_SIDEBAR ? ViewMode.HIDE_SIDEBAR : ViewMode.SHOW_SIDEBAR
    )
  }

  const handleViewEssay = () => {
    if (id) {
      navigate(replacePathId(RouteNames.EssayDetail, id))
    }
  }

  const renderSidebar = () => {
    if (viewMode === ViewMode.SHOW_SIDEBAR) {
      return (
        <Grid item xs={12} md={4}>
          <VocabTabView />
        </Grid>
      )
    }
    return null
  }

  const renderMainGridWidth = () => {
    return viewMode === ViewMode.SHOW_SIDEBAR ? 8 : 12
  }

  return (
    <ModalProvider>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={renderMainGridWidth()}>
            <UpdateEssayForm />
          </Grid>
          {renderSidebar()}
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <AppButton onClick={toggleSidebar}>
            {viewMode === ViewMode.HIDE_SIDEBAR ? 'Show Vocab Tab' : 'Hide Vocab Tab'}
          </AppButton>
          <AppButton onClick={handleViewEssay}>View Essay</AppButton>
        </Box>
      </Box>
    </ModalProvider>
  )
}

export default React.memo(EssayViewOnly)
