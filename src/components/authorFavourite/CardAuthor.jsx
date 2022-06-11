import React from 'react'
import { Box, Button, Typography } from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { blue, green } from '@mui/material/colors'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import { deleteAuthorFavourite } from '../../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { editUser } from '../../features/user/userSlice'
function CardAuthor({ author, listAuthorFavourite, setListAuthorFavourtie }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  //handle
  const handleClickCancelFavourite = async () => {
    console.log(user.idUser)
    console.log(author.idUser)
    const response = await deleteAuthorFavourite(
      user.idUser,
      author.idUser,
      user.dataToken
    )
    if (response.result) {
      toast.success(`${response.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      const newListAuthorFavourite = listAuthorFavourite.filter(
        (a) => a.idUser !== author.idUser
      )
      setListAuthorFavourtie(newListAuthorFavourite)
      dispatch(editUser({ listAuthorFavourite: newListAuthorFavourite }))
    } else {
      toast.error(`${response.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  return (
    <Box sx={{ display: 'flex', columnGap: '20px', marginBottom: '20px' }}>
      <Box sx={{ width: '200px', height: '200px' }}>
        <img
          src={author.avata}
          alt="avata.jpg"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
          }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '10px',
          }}
        >
          <Typography variant="button" display="block" gutterBottom>
            Tên:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {author.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '10px',
          }}
        >
          <Typography variant="button" display="block" gutterBottom>
            Giới tính:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {author.gender === 0 ? 'nam' : 'nữ'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '10px',
          }}
        >
          <Typography variant="button" display="block" gutterBottom>
            địa chỉ email:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {author.email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '10px',
          }}
        >
          <Typography variant="button" display="block" gutterBottom>
            số điện thoại:
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {author.phone}
          </Typography>
        </Box>
        <Button
          color="error"
          variant="outlined"
          startIcon={<HeartBrokenIcon color="error" />}
          sx={{ marginBottom: '10px' }}
          onClick={handleClickCancelFavourite}
        >
          Hủy yêu thích
        </Button>
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'flex-start',
            columnGap: '20px',
          }}
        >
          <FacebookIcon sx={{ color: blue[900] }} />
          <TwitterIcon sx={{ color: blue[500] }} />
          <WhatsAppIcon sx={{ color: green[700] }} />
          <TelegramIcon sx={{ color: blue[700] }} />
          <LinkedInIcon sx={{ color: blue[800] }} />
        </Box>
      </Box>
    </Box>
  )
}

export default CardAuthor
