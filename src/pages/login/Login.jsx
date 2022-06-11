import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addUser } from '../../features/user/userSlice'
import { login } from '../../services/userService'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    userName: '',
    password: '',
  })

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const checkLogin = async () => {
      const response = await login(values.userName, values.password)
      if (response.result) {
        const newUser = {
          ...response.dataUser,
          dataToken: response.dataToken,
          listAuthorFavourite: response.listAuthorFavourite,
        }
        dispatch(addUser(newUser))
        navigate('/')
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu sai!', {
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
    checkLogin()
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          padding: 2,
          flexDirection: 'column',
          width: 0.9,
          border: '1px solid black',
        }}
        onSubmit={handleSubmit}
      >
        <h2>Đăng nhập</h2>

        <TextField
          id="standard-basic"
          label="Tên tài khoản"
          variant="standard"
          sx={{ m: 4 }}
          value={values.userName}
          onChange={handleChange('userName')}
          required
        />
        <FormControl sx={{ m: 4 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Mật khẩu
          </InputLabel>
          <Input
            required
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={{ display: 'flex' }}>
          <p>Bạn chưa có tài khoản?</p>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            &nbsp; Đăng ký
          </Link>
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{ m: 4, width: 0.5, alignSelf: 'center' }}
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
    </Container>
  )
}

export default Login
