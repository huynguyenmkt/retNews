import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import SliderItem from '../../components/popularNewsHeader/SliderItem'
import { getTopArticles } from '../../services/articleService'
import { getUserById } from '../../services/userService'
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

const styleCartPost = {
  height: '242px',
  titleType: 'h6',
}
function NewsHeaader(props) {
  const [topArticles, setTopArticles] = useState([])

  const getTop3Articles = async () => {
    const data = await getTopArticles()
    if (data.result) {
      let listTopArticles = []
      for (const article of data.data) {
        const user = await getUserById(article.idUser)
        listTopArticles.push({ ...article, author: user })
      }
      setTopArticles(listTopArticles)
    }
  }
  useEffect(() => {
    getTop3Articles()
  }, [])
  // console.log(topArticles)
  return (
    <Container sx={{ marginTop: '90px' }}>
      {topArticles.length > 0 && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div>
                <Slider {...settings}>
                  <SliderItem
                    backgroundImage={topArticles[0].image}
                    title={topArticles[0].title}
                    author={topArticles[0].author.name}
                    idArticle={topArticles[0].idArticles}
                  />
                  <SliderItem
                    backgroundImage={topArticles[1].image}
                    title={topArticles[1].title}
                    author={topArticles[1].author.name}
                    idArticle={topArticles[1].idArticles}
                  />
                  <SliderItem
                    backgroundImage={topArticles[2].image}
                    title={topArticles[2].title}
                    author={topArticles[2].author.name}
                    idArticle={topArticles[2].idArticles}
                  />
                </Slider>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <SliderItem
                    backgroundImage={topArticles[1].image}
                    title={topArticles[1].title}
                    author={topArticles[1].author.name}
                    idArticle={topArticles[1].idArticles}
                    stylePost={styleCartPost}
                  />
                </Box>
                <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <SliderItem
                    backgroundImage={topArticles[2].image}
                    title={topArticles[2].title}
                    author={topArticles[2].author.name}
                    idArticle={topArticles[2].idArticles}
                    stylePost={styleCartPost}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  )
}

export default NewsHeaader
