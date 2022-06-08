import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
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
import { getAllCategory } from '../../services/categoryService'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
function SaveArticle({ onBack, idArticle }) {
  const user = useSelector((state) => state.user)
  const [listCategory, setListCategory] = useState([])
  const [article, setArticle] = useState({
    title: '',
    contentArticles: '',
    image: '',
    listCategory: [],
  })
  const [imageSelected, setImageSelected] = useState()
  const [selectedCategory, setSelectedCategory] = useState([])
  const [refresh, setRefresh] = useState(false)
  // console.log(selectedCategory)
  const getArticle = async (idArticle) => {
    const data = await getArticleById(idArticle)
    if (data.result) {
      const oldArticle = data.data
      setArticle(oldArticle)
      setRefresh(!refresh)
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
  const getCategorys = async () => {
    const data = await getAllCategory()
    if (data.result) {
      setListCategory(data.data)
    }
  }
  const getListSelectedCategory = () => {
    const oldListCategory = listCategory.filter((category) => {
      return (
        article.listCategory.findIndex((id) => {
          return id === category.idCategory
        }) > -1
      )
    })
    setSelectedCategory(oldListCategory)
  }
  useEffect(() => {
    getCategorys()
    if (idArticle) {
      getArticle(idArticle)
    }
  }, [idArticle])

  useEffect(() => {
    getListSelectedCategory()
  }, [refresh])
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
      // console.log(data)
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
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
    setArticle({
      ...article,
      listCategory: event.target.value.map((category) => category.idCategory),
    })
  }
  // console.log(article)
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
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            id="title"
            label="Tiêu đề"
            variant="standard"
            required
            sx={{
              width: '60%',
              alignSelf: 'flex-start',
              marginLeft: '20px',
            }}
            value={article.title}
            onChange={handleChangeArticle('title')}
          />
          <FormControl
            sx={{
              m: 3,
              width: '50%',
              alignSelf: 'flex-start',
              marginLeft: '20px',
            }}
          >
            <InputLabel id="demo-multiple-checkbox-label">Thể loại</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCategory}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) =>
                selected.map((item) => item.title).join(', ')
              }
              MenuProps={MenuProps}
            >
              {listCategory.map((category) => (
                <MenuItem key={category.idCategory} value={category}>
                  <Checkbox
                    checked={
                      selectedCategory.findIndex((c) => {
                        return c.idCategory === category.idCategory
                      }) > -1
                    }
                  />
                  <ListItemText primary={category.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
                marginLeft: '20px',
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
              alt="anh.jpg"
              style={{ maxWidth: '95%', marginLeft: '20px' }}
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
