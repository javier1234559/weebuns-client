import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import AppButton from '~/components/common/AppButton'
import CreateEssayForm, { CreateEssayFormData } from '~/features/essay/components/CreateEssayForm/CreateEssayForm'
import { setEssayData, setIsPreview } from '~/features/essay/essaySlice'
import EssayPreview from '~/features/essay/view/EssayPreview'
import VocabTabView from '~/features/vocabulary/views/VocabTabView'
import { RootState } from '~/store/store'

// Define the schema here or import it from the CreateEssayForm component
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  featuredImage: yup.mixed<File>().nullable().defined(),
  language: yup.string().required('Language is required'),
  hashtags: yup.array().of(yup.string().required()).defined()
})

function EssayCreateView() {
  const dispatch = useDispatch()
  const { essayData, isPreview } = useSelector((state: RootState) => state.essay)

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: essayData || {
      title: '',
      content: '',
      featuredImage: null,
      // thumbnail:
      // 'https://cdn.hashnode.com/res/hashnode/image/upload/v1728477561388/91deeac6-ca93-48ca-a3e9-2e3df452a031.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
      // createdAt: '',
      language: '',
      hashtags: []
    }
  })

  const togglePreview = () => {
    const currentData = getValues()
    dispatch(setEssayData(currentData))
    dispatch(setIsPreview(!isPreview))
  }

  const saveAsDraft = () => {
    const formData = getValues()
    dispatch(setEssayData(formData))
    // Logic to save as draft (e.g., API call)
    console.log('Saving draft:', formData)
    toast.success('Draft saved successfully')
  }

  const onSubmit: SubmitHandler<CreateEssayFormData> = async (data) => {
    try {
      // Logic to publish the essay (e.g., API call)
      console.log('Publishing essay:', data)
      dispatch(setEssayData(data))
      toast.success('Essay published successfully')
    } catch (error) {
      console.error('Form submission failed:', error)
      toast.error('Failed to publish essay')
    }
  }

  return (
    <>
      {!isPreview && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CreateEssayForm control={control} />
          </Grid>
          <Grid item xs={12} md={4}>
            <VocabTabView />
          </Grid>
        </Grid>
      )}

      {isPreview && essayData && (
        <Container sx={{ padding: '0px !important' }}>
          <EssayPreview data={essayData as any} />
        </Container>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <AppButton sx={{ marginRight: 1 }} onClick={togglePreview}>
          {isPreview ? 'Edit' : 'Preview'}
        </AppButton>
        <AppButton sx={{ marginRight: 1 }} onClick={saveAsDraft}>
          Save as Draft
        </AppButton>
        <AppButton onClick={handleSubmit(onSubmit)} variant='contained' color='primary'>
          Publish
        </AppButton>
      </Box>
    </>
  )
}

export default EssayCreateView
