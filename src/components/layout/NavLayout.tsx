import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'

import Header from '~/components/layout/PublicLayout/components/Navbar'

function NavLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box className='bg-patterns'>
        <Header />
        {children}
      </Box>
    </>
  )
}

export default NavLayout
