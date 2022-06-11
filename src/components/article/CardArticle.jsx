import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardArticle({ article, handleClose }) {
  const navigate = useNavigate()
  const handleClickArticle = () => {
    if (handleClose) handleClose()
    navigate(`/article/${article.idArticles}`)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClickArticle}>
        <CardMedia
          component="img"
          height="200"
          image={article.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ paddingY: '10px' }}
          >
            {`Tác Giả: ${article.user.name}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardArticle
