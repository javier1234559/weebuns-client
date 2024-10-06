<<<<<<< Updated upstream
import { FunctionComponent, ReactNode } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
=======
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { FunctionComponent, ReactNode } from 'react'
>>>>>>> Stashed changes

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
        boxShadow: 'none' // Uncomment to hide shadow
      }}
      {...restOfProps}
      style={{
        background: 'transparent'
      }}
    >
      <Container
        maxWidth='xl'
        // sx={{
        //   maxWidth: '98% !important'
        // }}
      >
        <Toolbar disableGutters sx={{ paddingX: 1 }}>
          {startNode}

          {/* <Typography
          variant='h6'
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Typography> */}

          <Box ml='auto' display='flex' gap={2}>
            {endNode}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
