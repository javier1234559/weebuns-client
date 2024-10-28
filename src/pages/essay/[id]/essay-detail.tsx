import Grid from '@mui/material/Grid'

import EssayDetailView from '~/features/essay/view/EssayDetailView'

function EssayDetail() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EssayDetailView />
        </Grid>
      </Grid>
    </>
  )
}

export default EssayDetail
