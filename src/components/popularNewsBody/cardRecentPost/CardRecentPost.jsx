import { Box } from '@mui/material'
import React from 'react'
import './CardRecentPost.css'
function CardRecentPost(props) {
  return (
    <Box sx={{ display: 'flex', mt: 2 }} className="container-card">
      <img
        className="image-card"
        src="https://loremflickr.com/cache/resized/65535_52063937398_39b792d9e2_z_500_400_nofilter.jpg"
        alt=""
      />
      <Box
        sx={{
          ml: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <span className="author-card">By David Hall</span>
        <h6 className="title-card">
          6 Best Tips for Building a Good Shipping Boat
        </h6>
      </Box>
    </Box>
  )
}

export default CardRecentPost
