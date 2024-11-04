import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import { setEssayData } from '~/features/essay/essaySlice'
import EssayPreview from '~/features/essay/view/EssayPreview'
import VocabTabView from '~/features/vocabulary/views/VocabTabView'

function EssayUpdateView() {
  const { id } = useParams()

  console.log(id)
  const dispatch = useDispatch()

  const togglePreview = () => {
    const formData = getValues()
  }

  const toggleHiddenVocabTab = () => {}

  const onSubmit = async (data: any) => {
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
          <Grid item xs={12} md={isHiddenVocabTab ? 12 : 8}>
            {/* <UpdateEssayForm control={control} /> */}
          </Grid>
          {!isHiddenVocabTab && (
            <Grid item xs={12} md={4}>
              <VocabTabView />
            </Grid>
          )}
        </Grid>
      )}

      {isPreview && essayData && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={isHiddenVocabTab ? 12 : 8}>
            <EssayPreview data={essayData as any} />
          </Grid>
          {!isHiddenVocabTab && (
            <Grid item xs={12} md={4}>
              <VocabTabView />
            </Grid>
          )}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <AppButton sx={{ marginRight: 1 }} onClick={togglePreview}>
          {isPreview ? 'Edit' : 'Preview'}
        </AppButton>
        <AppButton sx={{ marginRight: 1 }} onClick={toggleHiddenVocabTab}>
          {isHiddenVocabTab ? 'Hidden Vocab Tabs ' : 'Show Vocab Tabs'}
        </AppButton>
        <AppButton onClick={handleSubmit(onSubmit)} variant='contained' color='primary'>
          Publish
        </AppButton>
      </Box>
    </>
  )
}

EssayUpdateView.displayName = 'EssayUpdateView'
export default EssayUpdateView
