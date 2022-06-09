import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function SliderItem({
  backgroundImage,
  title,
  author,
  stylePost = { height: '500px', titleType: 'h3' },
  idArticle = '0',
}) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transition: '0.7s',
        height: stylePost.height,
        '&:hover': {
          cursor: 'pointer',
          transform: 'scale(1.1)',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          background:
            'linear-gradient(0deg, rgba(50,49,51,1) 5%, rgba(80,80,82,0.8071603641456583) 31%, rgba(255,255,255,0) 100%)',
          display: 'flex !important',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Link to={`/article/${idArticle}`} style={{ textDecoration: 'none' }}>
          <Typography
            variant={stylePost.titleType}
            gutterBottom
            component="div"
            sx={{ color: 'white', ml: 2 }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ color: 'white', ml: 2 }}
          >
            by {author}
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default SliderItem
