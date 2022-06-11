import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import Slider from 'react-slick'
import CardArticleSlider from './CardArticleSlider'
import { Divider, Typography } from '@mui/material'
import { getArticlesByIdCategory } from '../../services/articleService'

function ArticleSlider(props) {
  const [listArticle, setListArticle] = useState([])
  const settings = {
    infinite: listArticle.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }
  //get Data
  const getArticleTechnology = async () => {
    const response = await getArticlesByIdCategory(6)
    if (response.result) {
      setListArticle(response.data)
    }
  }
  useEffect(() => {
    getArticleTechnology()
  }, [])

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
            Công nghệ
          </Typography>
        </Divider>
        <Slider {...settings}>
          {listArticle.map((article) => (
            <div key={article.idArticles}>
              <CardArticleSlider article={article} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  )
}

export default ArticleSlider
