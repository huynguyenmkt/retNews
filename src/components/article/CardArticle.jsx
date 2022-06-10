import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'

function CardArticle({ article }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={article.img}
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
            {`By ${article.author}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardArticle
