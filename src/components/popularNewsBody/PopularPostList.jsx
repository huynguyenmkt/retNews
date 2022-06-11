import React, { useEffect, useState } from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import CardRecentPost from './cardRecentPost/CardRecentPost'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import Looks5Icon from '@mui/icons-material/Looks5'
import { red } from '@mui/material/colors'
import { getTopArticles } from '../../services/articleService'
function PopularPostList(props) {
  const [listArticle, setListArticle] = useState([])

  //get Data
  const getTopArticle = async () => {
    const response = await getTopArticles()
    if (response.result) {
      setListArticle(response.data)
    }
  }
  // console.log(listArticle)
  useEffect(() => {
    getTopArticle()
  }, [])

  return (
    <div>
      <Divider textAlign="left">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ fontWeight: '700' }}
        >
          Những bài viết phổ biến
        </Typography>
      </Divider>
      {listArticle.length > 0 && (
        <Stack>
          <Box sx={{ display: 'flex', alignItems: 'center', color: red[900] }}>
            <LooksOneIcon sx={{ mr: 1 }} />
            <CardRecentPost article={listArticle[0]} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: red[700] }}>
            <LooksTwoIcon sx={{ mr: 1 }} />
            <CardRecentPost article={listArticle[1]} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: red[600] }}>
            <Looks3Icon sx={{ mr: 1 }} />
            <CardRecentPost article={listArticle[2]} />
          </Box>
        </Stack>
      )}
    </div>
  )
}

export default PopularPostList
