import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { FunctionComponent, ReactNode } from 'react'

import SpaceSelect from '~/features/space/components/SpaceSelect'

interface Props {
  endNode?: ReactNode
  startNode?: ReactNode
  title?: string
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  return (
    <AppBar
      component='div'
      sx={{
        boxShadow: 'none',
        backdropFilter: 'blur(6px)',
        color: 'text.primary'
      }}
      {...restOfProps}
      style={{
        background: 'transparent'
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ paddingX: 1 }}>
          {startNode}

          <Box ml='auto' display='flex' gap={2}>
            <SpaceSelect />
            {endNode}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
