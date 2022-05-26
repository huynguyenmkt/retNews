import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import CardRecentPost from './cardRecentPost/CardRecentPost'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import Looks5Icon from '@mui/icons-material/Looks5'
import { red } from '@mui/material/colors'
function PopularPostList(props) {
  return (
    <div>
      <Divider textAlign="left">
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ fontWeight: '700' }}
        >
          Popular Post
        </Typography>
      </Divider>
      <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[900] }}>
          <LooksOneIcon sx={{ mr: 1 }} />
          <CardRecentPost />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[700] }}>
          <LooksTwoIcon sx={{ mr: 1 }} />
          <CardRecentPost />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[600] }}>
          <Looks3Icon sx={{ mr: 1 }} />
          <CardRecentPost />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[500] }}>
          <Looks4Icon sx={{ mr: 1 }} />
          <CardRecentPost />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[400] }}>
          <Looks5Icon sx={{ mr: 1 }} />
          <CardRecentPost />
        </Box>
      </Stack>
    </div>
  )
}

export default PopularPostList
