import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

function CardArticleSlider(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image="https://loremflickr.com/cache/resized/65535_51560411674_98a9701a47_z_500_400_nofilter.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            by Lizard
          </Typography>
          <Typography variant="h4">
            Maecenas accumsan tortor ut velit pharetra mollis.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardArticleSlider
