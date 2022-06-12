import React, { useState } from 'react'
import { editPassword } from '../../services/userService'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { delUser } from '../../features/user/userSlice'
function ChangePassword(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    userName: user.username,
    oldPassword: '',
    newPassword: '',
  })

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const changePassword = async (userName, oldPassword, newPassword) => {
    const response = await editPassword(
      userName,
      oldPassword,
      newPassword,
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
      dispatch(delUser())
      navigate('/login')
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
  const handleSubmit = (e) => {
    e.preventDefault()
    changePassword(values.userName, values.oldPassword, values.newPassword)
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
        <h2>Đổi mật khẩu</h2>

        <TextField
          id="standard-basic"
          label="Tên tài khoản"
          variant="standard"
          sx={{ m: 4 }}
          value={values.userName}
          onChange={handleChange('userName')}
          required
          disabled
        />
        <FormControl sx={{ m: 4 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Mật khẩu cũ
          </InputLabel>
          <Input
            required
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.oldPassword}
            onChange={handleChange('oldPassword')}
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
        <FormControl sx={{ m: 4 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-newPassword">
            Mật khẩu mới
          </InputLabel>
          <Input
            required
            id="standard-adornment-newPassword"
            type={showPassword ? 'text' : 'password'}
            value={values.newPassword}
            onChange={handleChange('newPassword')}
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
        <Button
          variant="contained"
          color="error"
          sx={{ m: 4, width: 0.5, alignSelf: 'center' }}
          type="submit"
        >
          Đổi mật khẩu
        </Button>
      </Box>
    </Container>
  )
}

export default ChangePassword
