import React from 'react'
import Slider from 'react-slick'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import SliderItem from '../../components/popularNewsHeader/SliderItem'
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  className: 'slider-home',
}

let title =
  'Global solidarity to fight COVID-19, and indonesia stay safe and health'
let author = 'david hall'
let backgroundImage2 =
  'https://loremflickr.com/cache/resized/65535_51789145743_3e38338594_b_800_600_nofilter.jpg'
let backgroundImage1 =
  'https://loremflickr.com/cache/resized/65535_51815831292_9d722d6a24_300_300_nofilter.jpg'
let backgroundImage3 =
  'https://loremflickr.com/cache/resized/65535_51539523192_aab959e831_c_800_600_nofilter.jpg'

const styleCartPost = {
  height: '242px',
  titleType: 'h6',
}
function NewsHeaader(props) {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <Slider {...settings}>
                <SliderItem
                  backgroundImage={backgroundImage1}
                  title={title}
                  author={author}
                />
                <SliderItem
                  backgroundImage={backgroundImage2}
                  title={title}
                  author={author}
                />
                <SliderItem
                  backgroundImage={backgroundImage3}
                  title={title}
                  author={author}
                />
              </Slider>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <SliderItem
                  backgroundImage="https://loremflickr.com/cache/resized/65535_51777456875_e533b42b05_z_600_400_nofilter.jpg"
                  title={title}
                  author={author}
                  stylePost={styleCartPost}
                />
              </Box>
              <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <SliderItem
                  backgroundImage="https://loremflickr.com/cache/resized/65535_51564349748_2ceac19a11_z_600_400_nofilter.jpg"
                  title={title}
                  author={author}
                  stylePost={styleCartPost}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default NewsHeaader
