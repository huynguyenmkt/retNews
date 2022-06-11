import { Box, Container, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CardAuthor from '../../components/authorFavourite/CardAuthor'

function AuthorFavourite(props) {
  const user = useSelector((state) => state.user)
  const [listAuthorFavourite, setListAuthorFavourtie] = useState(
    user.listAuthorFavourite
  )
  return (
    <Container maxWidth="md" sx={{ marginY: '50px' }}>
      <Divider>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{ fontSize: '40px', fontWeight: 500 }}
        >
          Danh sách tác giả yêu thích
        </Typography>
      </Divider>
      {listAuthorFavourite.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom component="div">
          Không có tác giả yêu thích
        </Typography>
      ) : (
        <Box sx={{ marginX: '20px', marginY: '20px' }}>
          {listAuthorFavourite.map((author) => (
            <CardAuthor
              author={author}
              listAuthorFavourite={listAuthorFavourite}
              setListAuthorFavourtie={setListAuthorFavourtie}
            />
          ))}
        </Box>
      )}
    </Container>
  )
}

export default AuthorFavourite
