import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardArticle from '../../components/article/CardArticle'
import { getArticleBySearch } from '../../services/articleService'
function Search(props) {
  let { keyword } = useParams()
  const [listArticle, setListArticle] = useState([])

  const getAllArticle = async () => {
    const response = await getArticleBySearch(keyword)
    // console.log(response)
    if (response.result) {
      setListArticle(response.data)
    }
  }
  useEffect(() => {
    getAllArticle()
  }, [keyword])
  return (
    <Container maxWidth="lg" sx={{ marginTop: '90px', minHeight: '600px' }}>
      <Divider>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: '1.75rem',
            fontWeight: 700,
          }}
        >
          Danh sách bài viết
        </Typography>
      </Divider>
      {listArticle.length > 0 ? (
        <Grid container spacing={2} sx={{ marginY: '20px' }}>
          {listArticle.map((article) => (
            <Grid item xs={4} key={article.idArticles}>
              <CardArticle article={article} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3>{`Không có bài viết nào với từ khóa: ${keyword}`}</h3>
      )}
    </Container>
  )
}

export default Search
