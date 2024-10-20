import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import AppButton from '~/components/common/AppButton'
import AppIconButton from '~/components/common/AppIconButton'
import AppInput from '~/components/common/AppInput'
import AppLink from '~/components/common/AppLink'
import { globalConfig } from '~/config'

/**
 * Renders Development tools when env.REACT_APP_DEBUG is true
 * url: /dev
 * @page Dev
 */
function DevView() {
  const [isOpen, setOpen] = useState(false)
  if (!globalConfig.IS_DEBUG) return null // Hide this page on when env.REACT_APP_DEBUG is not set

  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    setOpen(true)
  }

  return (
    <Container sx={{ p: 4 }}>
      <Typography variant='h1'>Development Tools</Typography>
      <Typography variant='h2'>Debug controls and components on this page...</Typography>

      <Box sx={{ border: 1, p: 8 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>
        <Button onClick={handleClick}>Open Snackbar</Button>
        <Typography variant='h3'>Box with border</Typography>
      </Box>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Input' />
          <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <AppInput variant='filled' />
            <AppInput variant='standard' />
            <AppInput variant='outlined' />
            {/* <OutlinedInput /> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='AppLink' />
          <CardContent>
            <AppLink>MUI default</AppLink> <AppLink color='inherit'>MUI inherit</AppLink>{' '}
            <AppLink color='primary'>MUI primary</AppLink> <AppLink color='secondary'>MUI secondary</AppLink>{' '}
            <AppLink color='textPrimary'>MUI textPrimary</AppLink>{' '}
            <AppLink color='textSecondary'>MUI textSecondary</AppLink> <AppLink color='error'>MUI error</AppLink> <br />
            <AppLink to='/'>Internal Link</AppLink> &nbsp;
            <AppLink to='/' openInNewTab>
              Internal Link in New Tab
            </AppLink>{' '}
            &nbsp;
            <AppLink href='//karpolan.com'>External Link</AppLink> &nbsp;
            <AppLink href='//karpolan.com' openInNewTab={false}>
              External Link in Same Tab
            </AppLink>{' '}
            &nbsp;
            <br />
            <AppButton to='/' sx={{ ml: 0 }} size='small' label='as Default Button' />
            <AppButton to='/' size='small' color='primary' label='as Primary Button' />
            <AppButton to='/' sx={{ mr: 0 }} size='small' color='secondary' label='as Secondary Button' />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='AppButton' />
          <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <AppButton sx={{ ml: 0 }} variant='black'>
              Default
            </AppButton>
            <AppButton variant='outlined'>Outlined</AppButton>
            <AppButton disabled>Disabled</AppButton>
            <AppButton color='primary'>Primary</AppButton>
            <AppButton color='secondary'>Secondary</AppButton>
            <AppButton color='error'>Error</AppButton>
            <AppButton variant='text'>Error outlined</AppButton>
            <AppButton color='warning'>Warning</AppButton>
            <AppButton color='info'>Info</AppButton>
            <AppButton tooltip='Click here to show a success' label='This a success Button' color='success'>
              Success
            </AppButton>
            <AppButton color='#FF8C00'>#FF8C00</AppButton>
            <AppButton color='rgb(50, 205, 50)'>rgb(50, 205, 50)</AppButton>
            <AppButton color='inherit' sx={{ mr: 0 }}>
              Inherit
            </AppButton>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='AppIconButton' />
          <CardContent>
            <AppIconButton title='Default icon, no color specified' />
            <AppIconButton icon='close' color='primary' title='Close icon with Primary color' />
            <AppIconButton icon='menu' color='secondary' title='Menu icon with Secondary color' />
            <AppIconButton icon='settings' color='error' title='Settings icon with Error color' />
            <AppIconButton icon='search' color='warning' title='Search icon with Warning color' />
            <AppIconButton icon='info' color='info' title='Info icon with Info color' />
            <AppIconButton icon='home' color='success' title='Home icon with Success color' />
            <AppIconButton
              icon='visibilityoff'
              color='#FF8C00'
              title='VisibilityOff icon with DarkOrange (#FF8C00) color'
            />
            <AppIconButton
              icon='visibilityon'
              color='rgb(50, 205, 50)'
              title='VisibilityOn icon with LimeGreen (rgb(50, 205, 50)) color'
            />
            <AppIconButton icon='account' color='inherit' title='Account icon with Inherit color' />
            {/* <AppIconButton icon="close" color="primary" disabled title="Disabled Close icon with Primary color" /> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='h1'>MUI Typo h1</Typography>
            <Typography variant='h2'>MUI Typography h2</Typography>
            <Typography variant='h3'>MUI Typography h3</Typography>
            <Typography variant='h4'>MUI Typography h4</Typography>
            <Typography variant='h5'>MUI Typography h5</Typography>
            <Typography variant='h6'>MUI Typography h6</Typography>
            <Divider />
            <Typography variant='subtitle1'>MUI Typography subtitle1</Typography>
            <Typography variant='subtitle2'>MUI Typography subtitle2</Typography>
            <Typography variant='caption'>MUI Typography caption</Typography>
            <Divider />
            <Typography variant='body1'>
              MUI Typography body1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Divider />
            <Typography variant='body2'>
              MUI Typography body2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Divider />
            <Typography variant='overline'>MUI Typography overline</Typography>
            <Divider />
            <Typography variant='button'>MUI Typography button</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default DevView
