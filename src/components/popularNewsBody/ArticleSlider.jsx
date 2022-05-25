import React from 'react'
import { Container } from '@mui/system'
import Slider from 'react-slick'
import CardArticleSlider from './CardArticleSlider'
import { Divider, Typography } from '@mui/material'
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
}
function ArticleSlider(props) {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <div>
        <Divider textAlign="left">
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ fontWeight: '700' }}
          >
            Technology
          </Typography>
        </Divider>
        <Slider {...settings}>
          <div>
            <CardArticleSlider />
          </div>
          <div>
            <CardArticleSlider />
          </div>
          <div>
            <CardArticleSlider />
          </div>
          <div>
            <CardArticleSlider />
          </div>
          <div>
            <CardArticleSlider />
          </div>
        </Slider>
      </div>
    </Container>
  )
}

export default ArticleSlider
