import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CardRecentPost.css'
function CardRecentPost({ article }) {
  const navigate = useNavigate()
  const handleClickArticle = () => {
    navigate(`/article/${article.idArticles}`)
  }
  return (
    <>
      {article && (
        <Box sx={{ display: 'flex', mt: 2 }} className="container-card">
          <img
            className="image-card"
            src={article.image}
            alt="anh.jpg"
            onClick={handleClickArticle}
          />
          <Box
            sx={{
              ml: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <span
              className="author-card"
              onClick={handleClickArticle}
            >{`Tác giả: ${article.user.name}`}</span>
            <h6 className="title-card" onClick={handleClickArticle}>
              {article.title}
            </h6>
          </Box>
        </Box>
      )}
    </>
  )
}

export default CardRecentPost
