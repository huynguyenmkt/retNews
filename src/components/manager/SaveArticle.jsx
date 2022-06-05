import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import {
  createArticle,
  getArticleById,
  editArticle,
} from '../../services/articleService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getImageUploaded } from '../../services/imageService'

function SaveArticle({ onBack, idArticle }) {
  const user = useSelector((state) => state.user)
  const [article, setArticle] = useState({
    title: '',
    contentArticles: '',
    image: '',
  })
  const getArticle = async (idArticle) => {
    const data = await getArticleById(idArticle)
    if (data.result) {
      setArticle(data.data)
    } else {
      toast.error(data.message, {
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
  useEffect(() => {
    if (idArticle) {
      getArticle(idArticle)
    }
  }, [idArticle])
  const [imageSelected, setImageSelected] = useState()
  //handle
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (imageSelected || article.image) {
      let data
      let newArticle = { ...article }
      if (imageSelected) {
        const urlImage = await getImageUploaded(imageSelected)
        newArticle = { ...article, image: urlImage }
      }
      if (idArticle) {
        data = await editArticle(newArticle, idArticle, user.dataToken)
      } else {
        data = await createArticle(user.idUser, newArticle, user.dataToken)
      }
      console.log(data)
      if (data.result) {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        onBack()
      } else {
        toast.error(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      toast.error('Vui lòng chọn ảnh', {
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
  const handleChangeArticle = (prop) => (event) => {
    setArticle({ ...article, [prop]: event.target.value })
  }
  const handleChangeImage = (e) => {
    // console.log(e.target.files[0])
    setImageSelected(e.target.files[0])
  }
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        component="div"
        sx={{ textAlign: 'center' }}
      >
        Thông tin bài viết
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '100%',
          },
          display: 'flex',
          justifyContent: 'space-around',
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            id="title"
            label="Tiêu đề"
            variant="standard"
            required
            sx={{
              width: '50%',
              alignSelf: 'flex-start',
              marginLeft: '20px',
            }}
            value={article.title}
            onChange={handleChangeArticle('title')}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              sx={{ display: 'none' }}
              onChange={handleChangeImage}
            />
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: 'red',
                marginY: '10px',
                '&:hover': {
                  backgroundColor: '#a30000',
                },
              }}
            >
              Chọn ảnh
            </Button>
          </label>
          {(imageSelected || article.image) && (
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : article.image
              }
              style={{ maxWidth: '90%' }}
            />
          )}
        </Box>
        <Box>
          <TextField
            id="content-article"
            label="Nội dung bài viết"
            multiline
            rows={15}
            required
            sx={{
              width: '100%',
            }}
            value={article.contentArticles}
            onChange={handleChangeArticle('contentArticles')}
          />
          <Box
            sx={{
              marginY: '20px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant="contained"
              startIcon={<SaveAsIcon />}
              sx={{
                width: '40%',
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: '#a30000',
                },
              }}
              type="submit"
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              endIcon={<CancelPresentationIcon />}
              sx={{
                width: '40%',
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: '#a30000',
                },
              }}
              onClick={onBack}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SaveArticle
