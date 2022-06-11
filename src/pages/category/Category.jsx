import { Box, Chip, Container, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardArticle from '../../components/article/CardArticle'
import { getArticlesByIdCategory } from '../../services/articleService'

const title = 'Proin eu nisl et arcu iaculis placerat sollicitudin ut est'
const content =
  'Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.'
const img = 'https://loremflickr.com/500/400'
const author = 'David Hall'
const article = {
  title,
  content,
  img,
  author,
}
function Category(props) {
  let { id, category } = useParams()
  const [listArticle, setListArticle] = useState([])
  //get Data
  const getArticleByCategory = async () => {
    const response = await getArticlesByIdCategory(id)
    if (response.result) {
      setListArticle(response.data)
    }
  }
  useEffect(() => {
    getArticleByCategory()
  }, [id])
  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      <Divider>
        <Chip
          label={category}
          sx={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: '1.75rem',
            fontWeight: 700,
          }}
          variant="outlined"
        />
      </Divider>
      <Grid container spacing={2} sx={{ marginY: '20px' }}>
        {listArticle.map((article) => (
          <Grid item xs={4}>
            <CardArticle article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Category
