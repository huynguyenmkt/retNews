import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Typography, Stack } from '@mui/material'
import SliderItem from '../popularNewsHeader/SliderItem'
import CardRecentPost from './cardRecentPost/CardRecentPost'
import { getTopRencentArticles } from '../../services/articleService'
const styleCartPost = {
  height: '242px',
  titleType: 'h6',
}
function RecentPost(props) {
  const [listArticle, setListArticle] = useState([])

  //get Data
  const getRecentAricle = async () => {
    const response = await getTopRencentArticles()
    if (response.result) {
      setListArticle(response.data)
    }
  }
  useEffect(() => {
    getRecentAricle()
  }, [])
  // console.log(listArticle)
  return (
    <div>
      <Divider textAlign="left">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ fontWeight: '700' }}
        >
          Những bài viết mới nhất
        </Typography>
      </Divider>
      {listArticle.length > 0 && (
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={5}>
            <Box sx={{ overflow: 'hidden' }}>
              <SliderItem
                backgroundImage={listArticle[0].image}
                title={listArticle[0].title}
                author={listArticle[0].user.name}
                stylePost={styleCartPost}
                idArticle={listArticle[0].idArticles}
              />
            </Box>
            <Stack>
              <CardRecentPost article={listArticle[2]} />
              <CardRecentPost article={listArticle[3]} />
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ overflow: 'hidden' }}>
              <SliderItem
                backgroundImage={listArticle[1].image}
                title={listArticle[1].title}
                author={listArticle[1].user.name}
                stylePost={styleCartPost}
                idArticle={listArticle[1].idArticles}
              />
            </Box>
            <Stack>
              <CardRecentPost article={listArticle[4]} />
              <CardRecentPost article={listArticle[5]} />
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default RecentPost
