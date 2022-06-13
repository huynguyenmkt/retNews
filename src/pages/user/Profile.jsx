import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Input,
} from '@mui/material'
import { toast } from 'react-toastify'
import { edit } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../features/user/userSlice'
import { grey } from '@mui/material/colors'
import { getImageUploaded } from '../../services/imageService'
import LoadingButton from '@mui/lab/LoadingButton'

function Profile() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: user.name,
    sex: user.gender,
    phone: user.phone,
    email: user.email,
    avatar: user.avata,
    userName: user.username,
  })
  const [imageSelected, setImageSelected] = useState()
  const [loading, setLoading] = useState(false)
  //   console.log(values)
  //handle
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleChangeImage = (e) => {
    setImageSelected(e.target.files[0])
  }
  const editNewUser = async () => {
    let data
    let url = ''
    if (imageSelected) {
      url = await getImageUploaded(imageSelected)
      const newValues = {
        ...values,
        avatar: url,
      }
      data = await edit(newValues, user.idUser, user.dataToken)
    } else {
      data = await edit(values, user.idUser, user.dataToken)
    }
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
      const newUser = {
        name: values.name,
        gender: values.sex,
        phone: values.phone,
        email: values.email,
        avata: url ? url : values.avatar,
        username: values.userName,
      }
      dispatch(editUser(newUser))
      // setLoading(false)
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
      // setLoading(false)
    }
    setLoading(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    editNewUser()
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '90px',
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
        <h2>Thông tin cá nhân của bạn:</h2>

        <TextField
          id="standard-basic"
          label="Tên của bạn:"
          variant="standard"
          sx={{ m: 4 }}
          value={values.name}
          onChange={handleChange('name')}
          required
        />
        <FormControl sx={{ padding: '32px' }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Giới tính:
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
          label="Số điện thoại:"
          variant="standard"
          sx={{ m: 4 }}
          value={values.phone}
          onChange={handleChange('phone')}
        />
        <TextField
          id="standard-basic3"
          label="Địa chỉ email:"
          variant="standard"
          sx={{ m: 4 }}
          value={values.email}
          onChange={handleChange('email')}
          type="email"
        />
        <TextField
          id="standard-basic4"
          label="Tên tài khoản:"
          variant="standard"
          sx={{ m: 4 }}
          value={values.userName}
          onChange={handleChange('userName')}
          required
        />
        <Box
          sx={{
            margin: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3
            style={{
              alignSelf: 'flex-start',
            }}
          >
            Ảnh đại diện:
          </h3>
          <img
            src={
              imageSelected ? URL.createObjectURL(imageSelected) : user.avata
            }
            alt="avatar-user.jpg"
            style={{
              maxWidth: '100%',
            }}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              sx={{
                display: 'none',
              }}
              onChange={handleChangeImage}
            />
            <Button variant="contained" component="span">
              Đổi ảnh đại diện
            </Button>
          </label>
        </Box>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <LoadingButton
            variant="contained"
            color="error"
            sx={{ m: 4, width: 0.5, alignSelf: 'center' }}
            type="submit"
            loading={loading}
          >
            Cập nhật
          </LoadingButton>
          <Button
            variant="contained"
            sx={{
              m: 4,
              width: 0.5,
              alignSelf: 'center',
              backgroundColor: grey[800],
              '&:hover': {
                backgroundColor: grey[900],
              },
            }}
            onClick={() => {
              navigate('/')
            }}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Profile
