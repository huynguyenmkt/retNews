import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { blue, green } from '@mui/material/colors'
import { getArticleById } from '../../services/articleService'
import { getUserById } from '../../services/userService'
import {
  createComment,
  getAllCommentByArticle,
} from '../../services/commentService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function ArticleDetail(props) {
  const user = useSelector((state) => state.user)
  const isExitUser = Object.keys(user).length > 0
  let { id } = useParams()
  const [article, setArticle] = useState()
  const [comments, setComments] = useState([])
  const [contentComment, setContentComment] = useState('')
  //get data
  const getArticle = async (id) => {
    const data = await getArticleById(id)
    if (data.result) {
      let article = data.data
      const user = await getUserById(article.idUser)
      setArticle({ ...article, author: user })
    }
  }
  const getComments = async (idArticle) => {
    const data = await getAllCommentByArticle(idArticle)
    if (data.result) {
      let newComments = []
      for (const comment of data.data) {
        const user = await getUserById(comment.idUser)
        newComments.push({ ...comment, user })
      }
      setComments(newComments)
    }
  }

  useEffect(() => {
    if (article) {
      getComments(article.idArticles)
    }
  }, [article])

  useEffect(() => {
    getArticle(id)
  }, [id])
  // console.log(comments)
  //handles
  const handleSubmit = async () => {
    const res = await createComment(
      user.idUser,
      article.idArticles,
      contentComment,
      user.dataToken
    )
    console.log(res)
    if (res.result) {
      toast.success(`${res.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast.error(`${res.message}`, {
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
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      {/* title */}
      <h1
        style={{
          width: '90%',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 700,
          color: '#000',
          fontSize: '2.75rem',
        }}
      >
        {article ? article.title : 'Không có tiêu đề'}
      </h1>
      {/* end title */}
      <Divider variant="middle" sx={{ marginY: '20px' }} />
      {/* author */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ marginRight: '10px' }}
        />
        <Typography variant="subtitle1" gutterBottom component="div">
          {article
            ? ` By ${article.author.name}, ${article.dateSubmitted.slice(
                0,
                10
              )}`
            : 'Không có tác giả'}
        </Typography>
      </Box>
      {/* end author */}
      {/* image article */}
      <Box sx={{ marginY: '20px' }}>
        <img
          src={article ? article.image : ''}
          alt="anh.jpg"
          style={{ width: '100%' }}
        />
      </Box>
      {/* end image article */}
      {/* views */}
      <Box
        sx={{
          fontSize: '30px',
          fontWeight: '700',
          display: 'inline-block',
          color: '#343a40',
          textAlign: 'center',
          marginRight: '5px',
        }}
      >
        {article ? article.views : '0'}
        <Typography variant="subtitle2" gutterBottom component="div">
          views
        </Typography>
      </Box>
      {/* end views */}
      {/* content article */}
      <Box sx={{ width: '70%', margin: 'auto' }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            maxWidth: '50em',
            margin: '0 auto',
            lineHeight: '28px',
            marginBottom: '1.5em',
            '&::first-letter': {
              initialLetter: 3,
              color: '#e74c3c',
              margin: '0 0.2em 0 0',
              fontSize: '5em',
              float: 'left',
              fontWeight: '600',
              lineHeight: 1,
            },
          }}
        >
          {article ? article.contentArticles : ''}
        </Typography>
      </Box>
      {/* end content article */}
      {/* tags */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '10px',
        }}
      >
        <LocalOfferIcon color="error" />
        <Button variant="outlined" color="error">
          Outlined
        </Button>
        <Button variant="outlined" color="error">
          Outlined
        </Button>
        <Button variant="outlined" color="error">
          Outlined
        </Button>
        <Button variant="outlined" color="error">
          Outlined
        </Button>
      </Box>
      {/* end tags */}
      {/* info author */}
      <Box
        sx={{
          padding: '20px 0',
          width: '70%',
          margin: '20px auto',
          border: '1px solid #ababab',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Avatar
          alt="Cindy Baker"
          src={article ? article.author.avata : ''}
          sx={{ width: 56, height: 56, margin: '10px', flexGrow: 0 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{
              textTransform: 'uppercase',
              color: '#6c757d',
              letterSpacing: '1px',
              fontFamily: '"Montserrat",sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              marginBottom: '5px',
            }}
          >
            Author
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              fontFamily: '"Montserrat",sans-serif',
              fontWeight: 700,
              color: '#000',
            }}
          >
            {article ? article.author.name : ''}
          </Typography>
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
      {/* end info author */}
      {/* Comments */}

      <Box sx={{ width: '70%', margin: '10px auto' }}>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{
            fontSize: '22px',
            marginBottom: '25px',
            marginTop: '30px',
            fontFamily: '"Montserrat",sans-serif',
            fontWeight: 700,
            color: '#000',
          }}
        >
          Comments:
        </Typography>
        {comments.map((comment) => (
          <Box sx={{ marginBottom: '30px' }} key={comment.idComment}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                columnGap: '10px',
              }}
            >
              <Avatar alt="Travis Howard" src={comment.user.avata} />
              <Typography variant="h6" gutterBottom component="div">
                {comment.user.name}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ paddingLeft: '49px' }}
            >
              {comment.contentComment}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* end Comments */}
      {/* post comment */}
      <Box
        sx={{
          padding: '20px 10px',
          width: '70%',
          margin: '20px auto',
          border: '1px solid #ababab',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{
            fontSize: '18px',
            marginBottom: '25px',
            marginTop: '20px',
            fontFamily: '"Montserrat",sans-serif',
            fontWeight: 700,
            color: '#000',
          }}
        >
          Enter your comment:
        </Typography>
        <TextField
          id="outlined-textarea"
          label="Comment"
          multiline
          rows={5}
          value={contentComment}
          onChange={(e) => setContentComment(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddCommentIcon />}
          color="error"
          sx={{ marginTop: '10px' }}
          disabled={!isExitUser}
          onClick={handleSubmit}
        >
          Add comment
        </Button>
      </Box>
      {/* end post comment */}
    </Container>
  )
}

export default ArticleDetail
