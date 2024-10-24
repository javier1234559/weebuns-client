import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import SearchCommunity from '~/features/community/components/Search'
import Sidebar from '~/features/community/components/SideBar/SideBar'
import FeedView from '~/features/community/views/FeedView'

function App() {
  return (
    <Container sx={{ pb: 8, pt: 4 }} maxWidth='lg'>
      <SearchCommunity />
      <Grid container spacing={4}>
        <FeedView />
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Container>
  )
}

App.displayName = 'App'
export default App
