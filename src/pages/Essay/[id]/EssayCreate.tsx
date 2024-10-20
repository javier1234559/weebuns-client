import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import AppButton from '~/components/common/AppButton'
import CreateEssayForm from '~/components/form/CreateEssayForm'
import { CreateEssayFormRef } from '~/components/form/CreateEssayForm/CreateEssayForm'
import { RouteNames } from '~/router/route-name'
import { openModal } from '~/store/modalSlice'

function EssayCreate() {
  const dispatch = useDispatch()
  const formRef = useRef<CreateEssayFormRef>(null)

  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Essay', href: RouteNames.Essay },
    { title: 'Create Essay', href: '' }
  ]

  const handleOnPreview = () => {
    if (formRef.current) {
      const formData = formRef.current.getValues()
      // Use formData to show preview
      console.log('Preview data:', formData)

      // Open a confirm modal
      dispatch(
        openModal({
          isConfirm: true,
          title: 'Confirm Preview',
          confirmText: 'Yes, show preview',
          cancelText: 'Cancel',
          onConfirm: () => {
            // Logic to show preview component
            console.log('Showing preview')
          }
        })
      )
    }
  }

  const saveAsDraft = () => {
    if (formRef.current) {
      const formData = formRef.current.getValues()
      // Logic to save as draft
      console.log('Saving draft:', formData)
      toast.success('Draft saved successfully')
    }
  }

  const handlePublish = async () => {
    if (formRef.current) {
      try {
        const formData = await formRef.current.submitForm()
        // Logic to publish the essay
        console.log('Publishing essay:', formData)
        // toast.success('Essay published successfully')
      } catch (error) {
        console.error('Form submission failed:', error)
        toast.error('Failed to publish essay')
      }
    }
  }

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Essay</Typography>
      </Box>

      {/*
      <CreateEssayView
       leftNav={
          <CreateEssayForm ref={formRef} />
      }
      rightContent={
        <VocabularyForm ref={formVocabularyRef} />
      }
      >

      isShowReview && <PreviewEssayView
       leftNav={
          <PreviewEssay ref={formRef} />
      }
      rightContent={
        <EssayVocabularyHistory ref={formVocabularyRef} />
      } /> */}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <AppButton sx={{ marginRight: 1 }} onClick={handleOnPreview}>
          Preview
        </AppButton>
        <AppButton sx={{ marginRight: 1 }} onClick={saveAsDraft}>
          Save as Draft
        </AppButton>
        <AppButton onClick={handlePublish} variant='contained' color='primary'>
          Publish
        </AppButton>
      </Box>
    </Container>
  )
}

export default EssayCreate
