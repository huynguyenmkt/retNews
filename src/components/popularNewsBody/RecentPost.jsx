import React from 'react'
import { Box, Divider, Grid, Typography, Stack } from '@mui/material'
import SliderItem from '../popularNewsHeader/SliderItem'
import CardRecentPost from './cardRecentPost/CardRecentPost'
const styleCartPost = {
  height: '242px',
  titleType: 'h6',
}
function RecentPost(props) {
  return (
    <div>
      <Divider textAlign="left">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ fontWeight: '700' }}
        >
          Recent Post
        </Typography>
      </Divider>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={5}>
          <Box sx={{ overflow: 'hidden' }}>
            <SliderItem
              backgroundImage="https://loremflickr.com/cache/resized/4012_4682124091_8a2ed151bb_z_600_400_nofilter.jpg"
              title="Barack Obama and Family Visit borobudur temple enjoy holiday indonesia."
              author="david hall"
              stylePost={styleCartPost}
            />
          </Box>
          <Stack>
            <CardRecentPost />
            <CardRecentPost />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ overflow: 'hidden' }}>
            <SliderItem
              backgroundImage="https://loremflickr.com/cache/resized/1196_3167660551_738464e7e3_c_600_400_nofilter.jpg"
              title="Barack Obama and Family Visit borobudur temple enjoy holiday indonesia."
              author="david hall"
              stylePost={styleCartPost}
            />
          </Box>
          <Stack>
            <CardRecentPost />
            <CardRecentPost />
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}

export default RecentPost
