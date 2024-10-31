import Typography from '@mui/material/Typography'

import AppButton from '~/components/common/AppButton'

function CreateVocabButton() {
  const navigateToCreateVocabulary = () => {
    // const linkToNavigate = replacePathId(RouteNames.VocabularyCreate, space.id)
    // navigate(linkToNavigate)
  }

  return (
    <AppButton variant='black' onClick={navigateToCreateVocabulary}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Create
      </Typography>
    </AppButton>
  )
}

export default CreateVocabButton
