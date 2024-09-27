import { Typography } from '@mui/material'
import AppLink from '~/components/common/AppLink'

/**
 * Renders "Landing" page
 * url: /
 * @page Landing
 */
const Landing = () => {
  return (
    <>
      <Typography variant='h1'>Boost your building</Typography>
      <Typography variant='subtitle1'>Boost your building</Typography>

      <div>This is Welcome page, put your content here....</div>
      <div>
        Take a look on samples of components at <AppLink to='/dev'>Debug Page</AppLink>
      </div>
      <div>
        The source code is available at <AppLink href='https://github.com/karpolan/react-mui-vite-ts'>GitHub</AppLink>
      </div>
    </>
  )
}

export default Landing
