import React, { useEffect, useState } from 'react'
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
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PeopleIcon from '@mui/icons-material/People'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { getTopRencentArticles } from '../../services/articleService'
import { getAllCategory } from '../../services/categoryService'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import HistoryIcon from '@mui/icons-material/History'
import { Divider, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
}

function Header(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isExitUser = Object.keys(user).length > 0
  const [search, setSearch] = useState('')
  const [listRecentArticle, setListRecentArticle] = useState([])
  const [listCategorys, setListCategorys] = useState([])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElNews, setAnchorElNews] = useState(null)
  const open = Boolean(anchorElNews)

  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const openCategory = Boolean(anchorElCategory)

  //get Data
  const getRecentArticles = async () => {
    const response = await getTopRencentArticles()
    if (response.result) {
      setListRecentArticle(response.data)
    }
  }
  const getCategorys = async () => {
    const response = await getAllCategory()
    if (response.result) {
      setListCategorys(response.data)
    }
  }
  useEffect(() => {
    getRecentArticles()
    getCategorys()
  }, [])

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
  const handleClickCategory = (event) => {
    setAnchorElCategory(event.currentTarget)
  }
  const handleCloseCategory = () => {
    setAnchorElCategory(null)
  }
  const handleChooseCategory = (idCategory, title) => {
    handleCloseCategory()
    navigate(`/category/${title}/${idCategory}`)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    handleCloseUserMenu()
    dispatch(delUser())
    navigate('/login')
  }
  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim() !== '') {
      navigate(`/article/search/${search}`)
    }
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{ backgroundColor: '#ebebeb' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <img src="/logo.jpg" alt="logo.jpg" />
            </Link>
          </Box>
          <Paper
            component="form"
            sx={{
              marginLeft: '20px',
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
            onSubmit={handleSearch}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm"
              value={search}
              onChange={handleChangeSearch}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
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
                  <Typography textAlign="center">Trang chủ</Typography>
                </MenuItem>
              </Link>
              <MenuItem key="News" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Bài viết mới nhất</Typography>
              </MenuItem>
              <MenuItem key="Category" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Thể loại bài viết</Typography>
              </MenuItem>
              <Link to={`/contact`} style={{ textDecoration: 'none' }}>
                <MenuItem key="Contact" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    Liên hệ với chúng tôi
                  </Typography>
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
                Trang chủ
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
              Bài viết mới
            </Button>

            <Button
              key="Category"
              onClick={handleClickCategory}
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
              Thể loại
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
                Liên hệ với chúng tôi
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
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: 'black' }}
                    >
                      <AccountBoxIcon sx={{ marginRight: '10px' }} />
                      <Typography textAlign="center">
                        Thông tin cá nhân
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link
                    to={`/author-favourite`}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: 'black' }}
                    >
                      <PeopleIcon sx={{ marginRight: '10px' }} />
                      <Typography textAlign="center">
                        Danh sách tác giả yêu thích
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link
                    to={`/change-password`}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: 'black' }}
                    >
                      <ChangeCircleIcon sx={{ marginRight: '10px' }} />
                      <Typography textAlign="center">
                        Thay đổi mật khẩu
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/history`} style={{ textDecoration: 'none' }}>
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{ color: 'black' }}
                    >
                      <HistoryIcon sx={{ marginRight: '10px' }} />
                      <Typography textAlign="center">Lịch sử</Typography>
                    </MenuItem>
                  </Link>
                  {user.role < 2 && (
                    <Link to={`/manager`} style={{ textDecoration: 'none' }}>
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{ color: 'black' }}
                      >
                        <ManageAccountsIcon sx={{ marginRight: '10px' }} />
                        <Typography textAlign="center">
                          Trang quản lý
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
                    <ExitToAppIcon sx={{ marginRight: '10px' }} />
                    <Typography textAlign="center">Đăng xuất</Typography>
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
        sx={{ backgroundColor: '#0000003d' }}
      >
        <Slider {...settings}>
          {listRecentArticle.map((article) => {
            return (
              <CardArticle
                article={article}
                handleClose={handleClose}
                key={article.idArticles}
              />
            )
          })}
        </Slider>
      </Menu>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorElCategory}
        open={openCategory}
        onClose={handleCloseCategory}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        {listCategorys.map((category) => (
          <MenuItem
            key={category.idCategory}
            onClick={() =>
              handleChooseCategory(category.idCategory, category.title)
            }
          >
            {category.title}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  )
}

export default Header
