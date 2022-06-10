import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { delUser } from '../../features/user/userSlice'
import Slider from 'react-slick'
import CardArticle from '../article/CardArticle'

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
}
const title = 'Proin eu nisl et arcu iaculis placerat sollicitudin ut est'
const content =
  'Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.'
const img = 'https://loremflickr.com/500/400'
const author = 'David Hall'
const article = {
  title,
  content,
  img,
  author,
}
function Header(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isExitUser = Object.keys(user).length > 0
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const [anchorElNews, setAnchorElNews] = useState(null)
  const open = Boolean(anchorElNews)
  const handleClick = (event) => {
    setAnchorElNews(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElNews(null)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    dispatch(delUser())
    navigate('/login')
  }
  return (
    <AppBar position="relative" color="transparent">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <img src="/logo.jpg" alt="logo.jpg" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                <MenuItem key="Home" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              <MenuItem key="News" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">News</Typography>
              </MenuItem>
              <MenuItem key="Category" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Category</Typography>
              </MenuItem>
              <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                <MenuItem key="Contact" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="./logo.jpg" alt="logo.jpg" />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              mr: 2,
            }}
          >
            <Link key="Home" to={`/`} style={{ textDecoration: 'none' }}>
              <Button
                key="Home"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  borderRadius: 0,
                  '&:hover': {
                    borderBottom: '1px solid red',
                    backgroundColor: 'white',
                  },
                }}
              >
                Home
              </Button>
            </Link>

            <Button
              key="News"
              onClick={handleClick}
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                borderRadius: 0,
                '&:hover': {
                  borderBottom: '1px solid red',
                  backgroundColor: 'white',
                },
              }}
            >
              News
            </Button>

            <Button
              key="Category"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                borderRadius: 0,
                '&:hover': {
                  borderBottom: '1px solid red',
                  backgroundColor: 'white',
                },
              }}
            >
              Category
            </Button>
            <Link to={`/contact`} style={{ textDecoration: 'none' }}>
              <Button
                key="Contact"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  borderRadius: 0,
                  '&:hover': {
                    borderBottom: '1px solid red',
                    backgroundColor: 'white',
                  },
                }}
              >
                Contact
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isExitUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user.avata} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button color="error" variant="contained">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorElNews}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Slider {...settings}>
          <CardArticle article={article} />
          <CardArticle article={article} />
          <CardArticle article={article} />
          <CardArticle article={article} />
          <CardArticle article={article} />
          <CardArticle article={article} />
        </Slider>
      </Menu>
    </AppBar>
  )
}

export default Header
