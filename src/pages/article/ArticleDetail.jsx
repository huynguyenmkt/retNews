import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { blue, green } from '@mui/material/colors'

function ArticleDetail(props) {
  let { id } = useParams()
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
        How to become a professional travel blogger
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
          By John Doe, Descember 09, 2016 In Business
        </Typography>
      </Box>
      {/* end author */}
      {/* image article */}
      <Box sx={{ marginY: '20px' }}>
        <img
          src="https://loremflickr.com/1920/960"
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
        150
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
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost unorthographic life One day however a small line of blind
          text by the name of Lorem Ipsum decided to leave for the far World of
          Grammar. Far far away, behind the word mountains, far from the
          countries Vokalia and Consonantia, there live the blind texts.
          Separated they live in Bookmarksgrove right at the coast of the
          Semantics, a large language ocean. A small river named Duden flows by
          their place and supplies it with the necessary regelialia. The Big
          Oxmox advised her not to do so, because there were thousands of bad
          Commas, wild Question Marks and devious Semikoli, but the Little Blind
          Text didn't listen. On her way she met a copy. The copy warned the
          Little Blind Text, that where it came from it would have been
          rewritten a thousand times and everything that was left from its
          origin would be the word “and” and the Little Blind Text should turn
          around and return to its own, safe country. The Big Oxmox advised her
          not to do so, because there were thousands of bad Commas, wild
          Question Marks and devious Semikoli, but the Little Blind Text didn't
          listen. On her way she met a copy. The copy warned the Little Blind
          Text, that where it came from it would have been rewritten a thousand
          times and everything that was left from its origin would be the word
          “and” and the Little Blind Text should turn around and return to its
          own, safe country.
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
          src="/static/images/avatar/3.jpg"
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
            Jhon Doe
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
        {/* Comment item */}
        <Box sx={{ marginBottom: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              columnGap: '10px',
            }}
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Typography variant="h6" gutterBottom component="div">
              Sinmun
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ paddingLeft: '49px' }}
          >
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
        </Box>
        {/* Comment item */}
        <Box sx={{ marginBottom: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              columnGap: '10px',
            }}
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Typography variant="h6" gutterBottom component="div">
              Sinmun
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ paddingLeft: '49px' }}
          >
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
        </Box>
        {/* Comment item */}
        <Box sx={{ marginBottom: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              columnGap: '10px',
            }}
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Typography variant="h6" gutterBottom component="div">
              Sinmun
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ paddingLeft: '49px' }}
          >
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>
        </Box>
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
        <TextField id="outlined-textarea" label="Comment" multiline rows={5} />
        <Button
          variant="contained"
          startIcon={<AddCommentIcon />}
          color="error"
          sx={{ marginTop: '10px' }}
        >
          Add comment
        </Button>
      </Box>
      {/* end post comment */}
    </Container>
  )
}

export default ArticleDetail
