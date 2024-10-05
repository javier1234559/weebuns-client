import { FunctionComponent, ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

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
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        <Typography
          variant='h6'
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Typography>

        {endNode}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar