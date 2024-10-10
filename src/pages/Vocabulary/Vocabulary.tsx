import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import AppButton from '~/components/common/AppButton'
import VocabTable from '~/components/views/vocabulary/VocabTable'
import { RouteNames } from '~/router/route-name'
import { RootState } from '~/store/store'

function CreateVocabularyButton() {
  const space = useSelector((state: RootState) => state.space.currentSpace)

  const navigateToCreateVocabulary = () => {
    if (!space) {
      toast.error('Please select a space first')
      return
    }

    if (!space?.id) {
      toast.error('Space ID is not available')
      return
    }

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

function Vocabulary() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Vocabulary },
    { title: 'Vocabulary', href: '' }
  ]

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Vocabulary</Typography>
        <CreateVocabularyButton />
      </Box>
      <VocabTable />
    </Container>
  )
}

Vocabulary.displayName = 'Vocabulary'
export default Vocabulary
