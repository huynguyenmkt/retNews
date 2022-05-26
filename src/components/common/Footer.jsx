import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { blue, green } from '@mui/material/colors'
const styleTextFooter = {
  color: 'white',
  transition: '0.5s',
  mr: 2,
  '&:hover': {
    color: '#c00',
    cursor: 'pointer',
  },
}
function Footer() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Container maxWidth="md" sx={{ pt: 2, pb: 2 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <img src="./logo.jpg" alt="" />
            <Box
              sx={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <FacebookIcon sx={{ color: blue[900] }} />
              <TwitterIcon sx={{ color: blue[500] }} />
              <WhatsAppIcon sx={{ color: green[700] }} />
              <TelegramIcon sx={{ color: blue[700] }} />
              <LinkedInIcon sx={{ color: blue[800] }} />
            </Box>
          </Box>
          <Divider sx={{ borderColor: '#ffffff4d' }}></Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              contact us
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              terms of use
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              adchoice
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              about us
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              newsletters
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              sitemap
            </Typography>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              sx={styleTextFooter}
            >
              magrenvi store
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={{ color: 'white', alignSelf: 'center' }}
          >
            Copyright © 2022 News and Magazine on React by Vanic
          </Typography>
        </Stack>
      </Container>
    </div>
  )
}

export default Footer
