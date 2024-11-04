// import { yupResolver } from '@hookform/resolvers/yup'
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
// import * as yup from 'yup'

// import AppButton from '~/components/common/AppButton'
// import CreateEssayForm, { CreateEssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'
// import { setEssayData, setIsHiddenVocabTab, setIsPreview } from '~/features/essay/essaySlice'
// import EssayPreview from '~/features/essay/view/EssayPreview'
// import VocabTabView from '~/features/vocabulary/views/VocabTabView'
// import { RootState } from '~/store/store'

// const schema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   cover_url: yup.string().nullable(),
//   content: yup.string().required('Content is required'),
//   language: yup.string().required('Language is required'),
//   hashtags: yup.array().of(yup.string().required()).defined()
// })

// function EssayCreateView() {
//   const dispatch = useDispatch()
//   const { essayData, isPreview, isHiddenVocabTab } = useSelector((state: RootState) => state.essay)

//   const { control, handleSubmit, getValues } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: essayData || {
//         title: string
//         content: string

//         cover_url?: string | null

//         language:   string
//         hashtag_names?: any[][]
//     }
//   })

//   const togglePreview = () => {
//     const formData = getValues()
//     dispatch(setEssayData(formData))
//     dispatch(setIsPreview(!isPreview))
//   }

//   const toggleHiddenVocabTab = () => {
//     dispatch(setIsHiddenVocabTab(!isHiddenVocabTab))
//   }

//   const saveAsDraft = () => {
//     const formData = getValues()
//     dispatch(setEssayData(formData))
//     // Logic to save as draft (e.g., API call)
//     console.log('Saving draft:', formData)
//     toast.success('Draft saved successfully')
//   }

//   const onSubmit: SubmitHandler<CreateEssayFormData> = async (data) => {
//     try {
//       // Logic to publish the essay (e.g., API call)
//       console.log('Publishing essay:', data)
//       dispatch(setEssayData(data))
//       toast.success('Essay published successfully')
//     } catch (error) {
//       console.error('Form submission failed:', error)
//       toast.error('Failed to publish essay')
//     }
//   }

//   return (
//     <>
//       {!isPreview && (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={isHiddenVocabTab ? 12 : 8}>
//             <CreateEssayForm control={control} />
//           </Grid>
//           {!isHiddenVocabTab && (
//             <Grid item xs={12} md={4}>
//               <VocabTabView />
//             </Grid>
//           )}
//         </Grid>
//       )}

//       {isPreview && essayData && (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={isHiddenVocabTab ? 12 : 8}>
//             <EssayPreview data={essayData as any} />
//           </Grid>
//           {!isHiddenVocabTab && (
//             <Grid item xs={12} md={4}>
//               <VocabTabView />
//             </Grid>
//           )}
//         </Grid>
//       )}

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//         <AppButton sx={{ marginRight: 1 }} onClick={togglePreview}>
//           {isPreview ? 'Edit' : 'Preview'}
//         </AppButton>
//         <AppButton sx={{ marginRight: 1 }} onClick={toggleHiddenVocabTab}>
//           {isHiddenVocabTab ? 'Hidden Vocab Tabs ' : 'Show Vocab Tabs'}
//         </AppButton>
//         <AppButton sx={{ marginRight: 1 }} onClick={saveAsDraft}>
//           Save as Draft
//         </AppButton>
//         <AppButton onClick={handleSubmit(onSubmit)} variant='contained' color='primary'>
//           Publish
//         </AppButton>
//       </Box>
//     </>
//   )
// }

// EssayCreateView.displayName = 'EssayCreateView'
// export default EssayCreateView

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppButton } from '~/components/common/AppButton'
import CreateEssayForm from '~/features/essay/components/CreateEssayForm'
import EssayPreview from '~/features/essay/view/EssayPreview'
import VocabTabView from '~/features/vocabulary/views/VocabTabView'
import { RootState } from '~/store/store'

enum ViewMode {
  EDIT_AND_HIDE_SIDEBAR = 'edit_and_hide_sidebar',
  EDIT_AND_SHOW_SIDEBAR = 'edit_and_show_sidebar',
  PREVIEW_AND_HIDE_SIDEBAR = 'preview_and_hide_sidebar',
  PREVIEW_AND_SHOW_SIDEBAR = 'preview_and_show_sidebar'
}

const EssayCreateView: React.FC = () => {
  const { essayFormData } = useSelector((state: RootState) => state.essay)
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EDIT_AND_SHOW_SIDEBAR)

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
            <VocabTabView />
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
              {viewMode === ViewMode.PREVIEW_AND_HIDE_SIDEBAR ? 'Show Vocab Tab' : 'Hide Vocab Tab'}
            </AppButton>
            <AppButton onClick={togglePreview}>Back to Edit</AppButton>
          </Box>
        )
      case ViewMode.EDIT_AND_HIDE_SIDEBAR:
      case ViewMode.EDIT_AND_SHOW_SIDEBAR:
        return (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <AppButton onClick={toggleSidebar}>
              {viewMode === ViewMode.EDIT_AND_HIDE_SIDEBAR ? 'Show Vocab Tab' : 'Hide Vocab Tab'}
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
    </Box>
  )
}

export default React.memo(EssayCreateView)
