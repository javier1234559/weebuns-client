import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Feed from '~/features/community/views/Feed'
import SearchCommunity from '~/features/community/views/Search'
import Sidebar from '~/features/community/views/SideBar/SideBar'

function App() {
  return (
    <Container sx={{ pb: 8, pt: 4 }} maxWidth='lg'>
      <SearchCommunity />
      <Grid container spacing={4}>
        <Feed />
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Container>
  )
}

App.displayName = 'App'
export default App
