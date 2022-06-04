import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
import { login, singup } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../../features/user/userSlice'
function SignUp(props) {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [rePassword, setRePassword] = useState('')
  const [values, setValues] = useState({
    name: '',
    sex: 0,
    phone: '',
    email: '',
    avatar:
      'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326297/male-avatar-icon-6_b0eizy.jpg',
    userName: '',
    password: '',
  })
  let navigate = useNavigate()
  const handleChangeRePassWord = (e) => {
    setRePassword(e.target.value)
  }
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (prop) => (event) => {
    if (prop === 'sex') {
      setValues({
        ...values,
        avatar: event.target.value
          ? 'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326281/download_1_cxgjnk.png'
          : 'https://res.cloudinary.com/ds2tbtsxd/image/upload/v1654326297/male-avatar-icon-6_b0eizy.jpg',
        [prop]: event.target.value,
      })
    } else {
      setValues({ ...values, [prop]: event.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.password !== rePassword) {
      toast.error('mật khẩu và nhập lại không khớp!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const data = await singup(values)
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
        const response = await login(values.userName, values.password)
        if (response.result) {
          const newUser = {
            ...response.dataUser,
            dataToken: response.dataToken,
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
          navigate('/login')
        }
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
  }
  // console.log(values)
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 3,
        mb: 3,
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
          height: 1,
        }}
        onSubmit={handleSubmit}
      >
        <h2>Đăng Ký</h2>

        <TextField
          id="standard-basic"
          label="Tên của bạn?"
          variant="standard"
          sx={{ m: 4 }}
          value={values.name}
          onChange={handleChange('name')}
          required
        />
        <FormControl sx={{ padding: '32px' }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Giới tính
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={values.sex}
            onChange={handleChange('sex')}
            sx={{ justifyContent: 'space-around' }}
          >
            <FormControlLabel value="0" control={<Radio />} label="Nam" />
            <FormControlLabel value="1" control={<Radio />} label="Nữ" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="standard-basic2"
          label="Số điện thoại"
          variant="standard"
          sx={{ m: 4 }}
          value={values.phone}
          onChange={handleChange('phone')}
        />
        <TextField
          id="standard-basic3"
          label="Địa chỉ email"
          variant="standard"
          sx={{ m: 4 }}
          value={values.email}
          onChange={handleChange('email')}
          type="email"
        />
        <TextField
          id="standard-basic4"
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
        <FormControl sx={{ m: 4 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password2">
            Nhập lại Mật khẩu
          </InputLabel>
          <Input
            required
            id="standard-adornment-password2"
            type={showPassword ? 'text' : 'password'}
            value={rePassword}
            onChange={handleChangeRePassWord}
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
          Đăng ký
        </Button>
      </Box>
    </Container>
  )
}

export default SignUp
