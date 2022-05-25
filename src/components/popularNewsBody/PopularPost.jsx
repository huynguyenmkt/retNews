import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import PopularPostList from './PopularPostList'
import RecentPost from './RecentPost'

function PopularPost(props) {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <RecentPost />
        </Grid>
        <Grid item xs={4}>
          <PopularPostList />
        </Grid>
      </Grid>
    </Container>
  )
}

export default PopularPost
