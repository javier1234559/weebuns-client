import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBreadcrumb from '~/components/common/AppBreadcrumbs'
import AppButton from '~/components/common/AppButton'
import { RouteNames } from '~/router/route-name'
function EssayCreate() {
  const breadcrumb = [
    { title: 'Home', href: RouteNames.Dashboard },
    { title: 'Essay', href: RouteNames.Essay },
    { title: 'Create Essay', href: '' }
  ]

  const handleOnPreview = () => {}

  const saveAsDraft = () => {}

  const handlePublish = async () => {}

  return (
    <Container>
      <AppBreadcrumb breadcrumb={breadcrumb} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h4'>Essay</Typography>
      </Box>
      {/* <CreateEssayForm ref={formRef} /> */}
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
