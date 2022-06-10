import { Box, Chip, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import CardArticle from '../../components/article/CardArticle'

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
  //   let { id } = useParams()
  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      <Divider>
        <Chip
          label="Category Travel"
          sx={{
            fontFamily: '"Montserrat",sans-serif',
            fontSize: '1.75rem',
            fontWeight: 700,
          }}
          variant="outlined"
        />
      </Divider>
      <Grid container spacing={2} sx={{ marginY: '20px' }}>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
        <Grid item xs={4}>
          <CardArticle article={article} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Category
