import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function CardArticleSlider({ article }) {
  const navigate = useNavigate()
  const handleClickArticle = () => {
    navigate(`/article/${article.idArticles}`)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={article.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            onClick={handleClickArticle}
          >
            {`Tác giả: ${article.user.name}`}
          </Typography>
          <Typography variant="h4" onClick={handleClickArticle}>
            {article.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardArticleSlider
