import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { AppButton } from '~/components/common/AppButton'
import AppLink from '~/components/common/AppLink'
import { RouteNames } from '~/router/route-name'

/**
 * Renders "Landing" page
 * url: /
 * @page Landing
 */
const Landing = () => {
  return (
    <>
      <Box
        component='section'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 4,
          gap: 2
        }}
      >
        <Typography variant='h1'>Welcome to weebuns</Typography>
        <Typography variant='body1' fontSize='20px' textTransform='none'>
          The e learning and language exchange platform
        </Typography>
        <div>
          <Typography variant='body1'>
            The starting point for your next project is based on MUI. Easy customization helps you build apps faster and
            better..
          </Typography>
        </div>
        <div>
          Take a look on samples of components at <AppLink to='/dev'>Debug Page</AppLink>
        </div>
        <div>
          The source code is available at <AppLink href='https://github.com/karpolan/react-mui-vite-ts'>GitHub</AppLink>
        </div>
        <Box mx='auto'>
          <AppButton variant='black' to={RouteNames.Login} sx={{ px: 4, py: 1 }} size='small' label='Get started' />
        </Box>
      </Box>
    </>
  )
}

export default Landing
