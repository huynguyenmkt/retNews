import React from 'react'
import { Divider, Typography } from '@mui/material'

function PopularPostList(props) {
  return (
    <div>
      <Divider textAlign="left">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ fontWeight: '700' }}
        >
          Popular Post
        </Typography>
      </Divider>
    </div>
  )
}

export default PopularPostList
